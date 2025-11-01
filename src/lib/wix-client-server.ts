import { ApiKeyStrategy, createClient, Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client.base";
import { cache } from "react";
import { jwtDecode } from "jwt-decode";
import { files } from "@wix/media";
import { env } from "@/env";

export const getWixServerClient = cache(async () => {
  // FORCE API KEY AUTHENTICATION - Bypass OAuth tokens completely
  const directSiteId = process.env.NEXT_PUBLIC_WIX_SITE_ID || env.NEXT_PUBLIC_WIX_SITE_ID;
  const directApiKey = process.env.WIX_API_KEY;
  
  console.log("🔧 FORCING API KEY AUTH - Direct Site ID:", directSiteId);
  console.log("🔧 API Key exists:", !!directApiKey);
  
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
