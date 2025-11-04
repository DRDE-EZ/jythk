import { createClient, OAuthStrategy } from '@wix/sdk';
import { products, collections } from '@wix/stores';
import { members } from '@wix/members';

// Create Wix client with OAuth strategy
export function createWixClient() {
  return createClient({
    modules: {
      products,
      collections,
      members,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    }),
  });
}

// Server-side client with API key for backend operations
export function getServerWixClient() {
  const client = createWixClient();
  const apiKey = process.env.WIX_API_KEY;
  
  if (apiKey) {
    // For server-side operations, we can set headers directly
    client.setHeaders({
      'Authorization': `Bearer ${apiKey}`,
    });
  }
  
  return client;
}

// Browser client for frontend operations
export function getBrowserWixClient() {
  return createWixClient();
}

// Get API key from environment
export function getWixApiKey() {
  return process.env.WIX_API_KEY;
}

// Helper function to make authenticated API calls
export async function makeAuthenticatedRequest(client: any, operation: () => Promise<any>) {
  const apiKey = getWixApiKey();
  
  if (apiKey) {
    // Set authorization header for this request
    client.setHeaders({
      'Authorization': `Bearer ${apiKey}`,
    });
  }
  
  try {
    return await operation();
  } catch (error) {
    console.error('Wix API request failed:', error);
    throw error;
  }
}

// Default export for general use
export const wixClient = createWixClient();

export default wixClient;