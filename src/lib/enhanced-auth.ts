import { products } from '@wix/stores';
import { members } from '@wix/members';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { WIX_OAUTH_DATA_COOKIE, WIX_SESSION_COOKIE } from '@/lib/constants';
import Cookies from 'js-cookie';

// Enhanced Wix client with Google OAuth support
export function createEnhancedWixClient() {
  return createClient({
    modules: { 
      products,
      members
    },
    auth: OAuthStrategy({ 
      clientId: '8ddda745-5ec1-49f1-ab74-5cc13da5c94f' 
    }),
  });
}

// Enhanced authentication functions with Google login
export class EnhancedAuth {
  private wixClient;

  constructor() {
    this.wixClient = createEnhancedWixClient();
  }

  // Generate OAuth data for authentication
  async generateOAuthData(redirectPath = '/profile') {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';
    const callbackUrl = `${baseUrl}/api/auth/callback/wix`;
    const originalUri = `${baseUrl}${redirectPath}`;

    return await this.wixClient.auth.generateOAuthData(callbackUrl, originalUri);
  }

  // Google login with enhanced logging
  async loginWithGoogle(redirectPath = '/profile') {
    try {
      console.log('🚀 Starting Google login with new client ID...');
      
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

      console.log('✅ Google auth URL generated:', authUrl);
      
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

  // Get current member
  async getCurrentMember() {
    try {
      const member = await this.wixClient.members.getCurrentMember();
      return member;
    } catch (error) {
      console.error('Failed to get current member:', error);
      return null;
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