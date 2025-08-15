import { WixClient } from "@/lib/wix-client.base";
import { env } from "@/env";
import { OauthData } from "@wix/sdk";

export async function generateOAuthData(
  wixClient: WixClient,
  originPath?: string
) {
  return wixClient.auth.generateOAuthData(
    "https://mycropc.com/api/auth/callback/wix", // Hardcode the correct domain
    "https://mycropc.com/" + (originPath || "") // Hardcode the correct domain
  );
}

export async function getLoginUrl(wixClient: WixClient, oAuthData: OauthData) {
  const { authUrl } = await wixClient.auth.getAuthUrl(oAuthData, {
    responseMode: "query",
  });

  console.log("Generated auth URL:", authUrl);

  return authUrl;
}

export async function getLogoutUrl(wixClient: WixClient) {
  const { logoutUrl } = await wixClient.auth.logout(env.NEXT_PUBLIC_BASE_URL);

  return logoutUrl;
}
