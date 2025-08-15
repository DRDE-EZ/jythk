import { ApiKeyStrategy, createClient, Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client.base";
import { cache } from "react";
import { jwtDecode } from "jwt-decode";
import { files } from "@wix/media";
import { env } from "@/env";

export const getWixServerClient = cache(async () => {
  let tokens: Tokens | undefined;

  const rawCookie = (await cookies()).get(WIX_SESSION_COOKIE)?.value;

  if (rawCookie) {
    try {
      tokens = JSON.parse(rawCookie);
    } catch (error) {
      console.error("Failed to parse tokens JSON from cookie:", error);
      tokens = undefined;
    }
  }

  if (tokens && tokens.accessToken?.value) {
    let tokenStr = tokens.accessToken.value;

    // Strip "OauthNG.JWS." prefix if present
    if (tokenStr.startsWith("OauthNG.JWS.")) {
      tokenStr = tokenStr.substring("OauthNG.JWS.".length);
    }

    if (tokenStr.split(".").length === 3) {
      try {
        const decodedTokenStr = decodeURIComponent(tokenStr);
        const decoded = jwtDecode(decodedTokenStr);
        console.log("Token payload:", decoded);
      } catch (err) {
        console.error("Error decoding JWT token:", err);
      }
    } else {
      console.error("Invalid JWT token format:", tokenStr);
    }
  } else {
    console.log("No valid tokens found");
  }

  return getWixClient(tokens);
});

export const getWixAdminClient = cache(() => {
  const wixClient = createClient({
    modules: {
      files,
    },
    auth: ApiKeyStrategy({
      apiKey: env.WIX_API_KEY,
      siteId: env.NEXT_PUBLIC_WIX_SITE_ID,
    }),
  });

  return wixClient;
});
