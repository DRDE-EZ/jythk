import { ApiKeyStrategy, OAuthStrategy, createClient, Tokens } from "@wix/sdk";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client.base";
import { cache } from "react";
import { jwtDecode } from "jwt-decode";
import { files } from "@wix/media";
import { env } from "@/env";
import { cookies } from "next/headers";

export const getWixServerClient = cache(async () => {
  // Try to get session tokens from cookies first (for member authentication)
  let tokens: Tokens | undefined;
  
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(WIX_SESSION_COOKIE);
    
    if (sessionCookie?.value) {
      tokens = JSON.parse(sessionCookie.value);
      console.log("✅ Using OAuth tokens from session");
    }
  } catch (error) {
    console.log("No session tokens found, using API key fallback");
  }

  // If we have tokens, use OAuth strategy for member authentication
  if (tokens) {
    try {
      const wixClient = createClient({
        modules: {
          products: require("@wix/stores").products,
          collections: require("@wix/stores").collections,
          currentCart: require("@wix/ecom").currentCart,
          checkout: require("@wix/ecom").checkout,
          redirects: require("@wix/redirects").redirects,
          orders: require("@wix/ecom").orders,
          recommendations: require("@wix/ecom").recommendations,
          backInStockNotifications: require("@wix/ecom").backInStockNotifications,
          reviews: require("@wix/reviews").reviews,
          members: require("@wix/members").members,
          files: require("@wix/media").files,
        },
        auth: OAuthStrategy({
          clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
          tokens,
        }),
      });

      return wixClient;
    } catch (error) {
      console.error("OAuth client creation failed, falling back to API key:", error);
    }
  }

  // Fallback to API Key for public data only
  const directSiteId = process.env.NEXT_PUBLIC_WIX_SITE_ID || env.NEXT_PUBLIC_WIX_SITE_ID;
  const directApiKey = process.env.WIX_API_KEY;
  
  console.log("� Using API Key auth (public data only)");
  
  if (!directSiteId || !directApiKey) {
    throw new Error("Missing required Wix configuration. Please check your environment variables.");
  }

  try {
    const wixClient = createClient({
      modules: {
        products: require("@wix/stores").products,
        collections: require("@wix/stores").collections,
        currentCart: require("@wix/ecom").currentCart,
        checkout: require("@wix/ecom").checkout,
        redirects: require("@wix/redirects").redirects,
        orders: require("@wix/ecom").orders,
        recommendations: require("@wix/ecom").recommendations,
        backInStockNotifications: require("@wix/ecom").backInStockNotifications,
        reviews: require("@wix/reviews").reviews,
        members: require("@wix/members").members,
        files: require("@wix/media").files,
      },
      auth: ApiKeyStrategy({
        apiKey: directApiKey,
        siteId: directSiteId,
      }),
    });

    return wixClient;
  } catch (error) {
    console.error("Failed to initialize Wix client:", error);
    throw error;
  }
});

export const getWixAdminClient = cache(() => {
  try {
    const apiKey = process.env.WIX_API_KEY || env.WIX_API_KEY;
    const siteId = process.env.NEXT_PUBLIC_WIX_SITE_ID || env.NEXT_PUBLIC_WIX_SITE_ID;
    
    if (!apiKey || !siteId) {
      throw new Error("Missing Wix API configuration for admin client");
    }

    const wixClient = createClient({
      modules: {
        files,
      },
      auth: ApiKeyStrategy({
        apiKey: apiKey,
        siteId: siteId,
      }),
    });

    return wixClient;
  } catch (error) {
    console.error("Failed to initialize Wix admin client:", error);
    throw error;
  }
});
