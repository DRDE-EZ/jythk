import { products } from '@wix/stores';
import { members } from '@wix/members';
import { createClient, OAuthStrategy } from '@wix/sdk';
import Cookies from 'js-cookie';

// Get client ID from environment variable
const CLIENT_ID = typeof window !== 'undefined' 
  ? (window as any).__NEXT_PUBLIC_WIX_CLIENT_ID || process.env.NEXT_PUBLIC_WIX_CLIENT_ID || '5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e'
  : process.env.NEXT_PUBLIC_WIX_CLIENT_ID || '5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e';

const WIX_SESSION_COOKIE = `wix_session_${CLIENT_ID}`;
const WIX_OAUTH_DATA_COOKIE = `wix_oauth_data_${CLIENT_ID}`;

// Enhanced Wix client with Google OAuth support
export function createEnhancedWixClient() {
  return createClient({
    modules: { 
      products,
      members
    },
    auth: OAuthStrategy({ 
      clientId: CLIENT_ID
    }),
  });
}

// Enhanced authentication functions with Google login
export class EnhancedAuth {
  private wixClient;

  constructor() {
    this.wixClient = createEnhancedWixClient();
    this.loadSession();
  }

  // Load existing session from cookies
  private loadSession() {
    if (typeof window !== 'undefined') {
      const sessionCookie = Cookies.get(WIX_SESSION_COOKIE);
      if (sessionCookie) {
        try {
          const tokens = JSON.parse(sessionCookie);
          this.wixClient.auth.setTokens(tokens);
          console.log('✅ Session loaded from cookies');
        } catch (error) {
          console.error('Failed to load session:', error);
          Cookies.remove(WIX_SESSION_COOKIE);
        }
      }
    }
  }

  // Generate OAuth data for authentication
  async generateOAuthData(redirectPath = '/profile') {
    const baseUrl = 'https://jythk.vercel.app';
    const callbackUrl = `${baseUrl}/api/auth/callback/wix`;
    const originalUri = `${baseUrl}${redirectPath}`;

    console.log('OAuth callback URL:', callbackUrl);
    console.log('OAuth redirect after login:', originalUri);

    return await this.wixClient.auth.generateOAuthData(callbackUrl, originalUri);
  }

  // Google login
  async loginWithGoogle(redirectPath = '/customer-dashboard-protected') {
    try {
      console.log('Starting Google login');
      
      // Clear any existing session
      Cookies.remove(WIX_SESSION_COOKIE);
      
      // Generate OAuth data
      const oAuthData = await this.generateOAuthData(redirectPath);
      
      // Store OAuth data in cookie
      Cookies.set(WIX_OAUTH_DATA_COOKIE, JSON.stringify(oAuthData), {
        secure: true,
        sameSite: 'lax',
        path: '/',
        expires: new Date(Date.now() + 10 * 60 * 1000)
      });
      
      // Also store in sessionStorage as backup
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(WIX_OAUTH_DATA_COOKIE, JSON.stringify(oAuthData));
      }
      
      // Generate Google auth URL
      const { authUrl } = await this.wixClient.auth.getAuthUrl(oAuthData, {
        responseMode: 'query',
        prompt: 'select_account'
      });
      
      console.log('Redirecting to Google...', authUrl);
      
      // Redirect to Google OAuth
      window.location.href = authUrl;
      
      return { success: true, authUrl };
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  // Regular email login
  async loginWithEmail(redirectPath = '/profile') {
    try {
      console.log('📧 Starting email login...');
      
      const oAuthData = await this.generateOAuthData(redirectPath);
      
      // Store OAuth data
      Cookies.set(WIX_OAUTH_DATA_COOKIE, JSON.stringify(oAuthData), {
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 10 * 60 * 1000)
      });

      // Generate regular auth URL
      const { authUrl } = await this.wixClient.auth.getAuthUrl(oAuthData, {
        responseMode: 'query'
      });

      console.log('✅ Email auth URL generated:', authUrl);
      
      // Redirect to Wix login
      window.location.href = authUrl;
      
      return { success: true, authUrl };
    } catch (error) {
      console.error('❌ Email login failed:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Email login failed: ${errorMessage}`);
    }
  }

  // Logout function with optional silent mode (for clearing session before login)
  async logout(silent = false) {
    try {
      // Clear all session data
      Cookies.remove(WIX_SESSION_COOKIE);
      Cookies.remove(WIX_OAUTH_DATA_COOKIE);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(WIX_OAUTH_DATA_COOKIE);
      }
      console.log('🚪 Logged out - all session data cleared');
      
      if (silent) {
        // Just clear session without redirect (for re-login flow)
        return;
      }
      
      // Full logout with redirect
      const baseUrl = 'https://jythk.vercel.app';
      const { logoutUrl } = await this.wixClient.auth.logout(baseUrl);
      window.location.href = logoutUrl;
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: just clear cookies
      Cookies.remove(WIX_SESSION_COOKIE);
      Cookies.remove(WIX_OAUTH_DATA_COOKIE);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(WIX_OAUTH_DATA_COOKIE);
      }
      if (!silent) {
        window.location.href = '/';
      }
    }
  }

  // Get current member with better error handling - returns null if not authenticated
  async getCurrentMember() {
    try {
      // First check if we have valid session tokens
      const sessionToken = Cookies.get(WIX_SESSION_COOKIE);
      if (!sessionToken) {
        console.log('❌ No session token found');
        return null; // Return null instead of throwing
      }

      // Reload session to ensure tokens are set
      try {
        const tokens = JSON.parse(sessionToken);
        if (!tokens || !tokens.accessToken) {
          console.log('❌ Invalid session tokens');
          Cookies.remove(WIX_SESSION_COOKIE);
          return null; // Return null instead of throwing
        }
        this.wixClient.auth.setTokens(tokens);
        console.log('✅ Using OAuth tokens from session');
      } catch (parseError) {
        console.error('Failed to parse session tokens:', parseError);
        Cookies.remove(WIX_SESSION_COOKIE);
        return null; // Return null instead of throwing
      }

      const member = await this.wixClient.members.getCurrentMember();
      console.log('✅ Current member retrieved:', member.member?.contact?.firstName || member.member?.loginEmail || 'Unknown');
      return member;
    } catch (error: any) {
      console.error('Failed to get current member:', error);
      
      // If it's a permission denied error, clear invalid session
      if (error?.details?.applicationError?.code === 'PERMISSION_DENIED' ||
          error?.message?.includes('Member authentication not available')) {
        console.log('🚫 Permission denied - clearing invalid session');
        Cookies.remove(WIX_SESSION_COOKIE);
        Cookies.remove(WIX_OAUTH_DATA_COOKIE);
      }
      
      return null; // Return null for any error - don't throw
    }
  }

  // Fetch products
  async getProducts() {
    try {
      const productList = await this.wixClient.products.queryProducts().find();
      
      console.log('📦 Products fetched:');
      console.log('Total: ', productList.items.length);
      console.log(productList.items.map((item) => item.name).join('\n'));
      
      return {
        success: true,
        total: productList.items.length,
        products: productList.items,
        names: productList.items.map((item) => item.name)
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: errorMessage,
        total: 0,
        products: [],
        names: []
      };
    }
  }
}

// Export singleton instance
export const enhancedAuth = new EnhancedAuth();