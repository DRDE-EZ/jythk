import { products } from '@wix/stores';
import { members } from '@wix/members';
import { createClient, OAuthStrategy } from '@wix/sdk';
import Cookies from 'js-cookie';

// Use hardcoded client ID to avoid environment variable conflicts
const CLIENT_ID = '8ddda745-5ec1-49f1-ab74-5cc13da5c94f';
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
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';
    const callbackUrl = `${baseUrl}/api/auth/callback/wix`;
    const originalUri = `${baseUrl}${redirectPath}`;

    return await this.wixClient.auth.generateOAuthData(callbackUrl, originalUri);
  }

  // Google login with enhanced logging
  async loginWithGoogle(redirectPath = '/customer-dashboard-protected') {
    try {
      console.log('🚀 Starting Google login, will redirect to:', redirectPath);
      
      const oAuthData = await this.generateOAuthData(redirectPath);
      
      // Store OAuth data
      Cookies.set(WIX_OAUTH_DATA_COOKIE, JSON.stringify(oAuthData), {
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      });

      // Generate Google auth URL with specific prompt
      const { authUrl } = await this.wixClient.auth.getAuthUrl(oAuthData, {
        responseMode: 'query',
        prompt: 'login' // Force Google login prompt
      });

      console.log('✅ Google auth URL generated');
      
      // Redirect to Google OAuth
      window.location.href = authUrl;
      
      return { success: true, authUrl };
    } catch (error) {
      console.error('❌ Google login failed:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Google login failed: ${errorMessage}`);
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

  // Logout function
  async logout() {
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';
      const { logoutUrl } = await this.wixClient.auth.logout(baseUrl);
      
      // Clear session cookies
      Cookies.remove(WIX_SESSION_COOKIE);
      Cookies.remove(WIX_OAUTH_DATA_COOKIE);
      
      // Redirect to logout URL
      window.location.href = logoutUrl;
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: just clear cookies and redirect home
      Cookies.remove(WIX_SESSION_COOKIE);
      Cookies.remove(WIX_OAUTH_DATA_COOKIE);
      window.location.href = '/';
    }
  }

  // Get current member with better error handling
  async getCurrentMember() {
    try {
      // First check if we have valid session tokens
      const sessionToken = Cookies.get(WIX_SESSION_COOKIE);
      if (!sessionToken) {
        console.log('❌ No session token found');
        throw new Error('No active session. Please sign in.');
      }

      // Reload session to ensure tokens are set
      try {
        const tokens = JSON.parse(sessionToken);
        if (!tokens || !tokens.accessToken) {
          console.log('❌ Invalid session tokens');
          Cookies.remove(WIX_SESSION_COOKIE);
          throw new Error('Invalid session. Please sign in again.');
        }
        this.wixClient.auth.setTokens(tokens);
        console.log('✅ Using OAuth tokens from session');
      } catch (parseError) {
        console.error('Failed to parse session tokens:', parseError);
        Cookies.remove(WIX_SESSION_COOKIE);
        throw new Error('Invalid session. Please sign in again.');
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
      
      throw error; // Re-throw instead of returning null
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