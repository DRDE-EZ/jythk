import { WixClient } from "@/lib/wix-client.base";
import { env } from "@/env";
import { OauthData } from "@wix/sdk";

export async function generateOAuthData(
  wixClient: WixClient,
  originPath?: string
) {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
  const callbackUrl = baseUrl + "/api/auth/callback/wix";
  
  // Default to customer dashboard instead of useless profile
  let redirectPath = originPath || "/customer-dashboard-protected";
  
  // Clean up the path
  if (redirectPath.startsWith('/')) {
    redirectPath = redirectPath.substring(1);
  }
  
  const originalUri = baseUrl + "/" + redirectPath;
  
  console.log("=== GENERATE OAUTH DATA DEBUG ===");
  console.log("Base URL:", baseUrl);
  console.log("Callback URL:", callbackUrl);
  console.log("Original URI:", originalUri);
  console.log("Redirect path:", redirectPath);

  const result = wixClient.auth.generateOAuthData(callbackUrl, originalUri);
  console.log("OAuth data generated:", result);
  
  return result;
}

export async function getLoginUrl(wixClient: WixClient, oAuthData: OauthData) {
  const { authUrl } = await wixClient.auth.getAuthUrl(oAuthData, {
    responseMode: "query",
  });

  console.log("Generated auth URL:", authUrl);

  return authUrl;
}

export async function getGoogleLoginUrl(wixClient: WixClient, oAuthData: OauthData) {
  console.log("=== GOOGLE LOGIN URL DEBUG ===");
  console.log("OAuth data passed:", oAuthData);
  
  const { authUrl } = await wixClient.auth.getAuthUrl(oAuthData, {
    responseMode: "query",
    prompt: "login",
  });

  console.log("Generated Google auth URL:", authUrl);
  console.log("URL breakdown:", {
    origin: new URL(authUrl).origin,
    pathname: new URL(authUrl).pathname,
    search: new URL(authUrl).search
  });

  return authUrl;
}

export async function getLogoutUrl(wixClient: WixClient) {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
  const { logoutUrl } = await wixClient.auth.logout(baseUrl);

  return logoutUrl;
}
