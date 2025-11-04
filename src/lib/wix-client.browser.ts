import { Tokens } from "@wix/sdk";
import Cookies from "js-cookie";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client.base";
import { env } from "@/env";

let tokens: Tokens | null = null;

const cookieValue = Cookies.get(WIX_SESSION_COOKIE);

if (cookieValue) {
  try {
    tokens = JSON.parse(cookieValue);
  } catch (error) {
    console.error("Failed to parse WIX_SESSION_COOKIE:", error);
  }
}

// Always create a client for authentication purposes, even without tokens
export const wixBrowserClient = getWixClient(tokens || undefined);

// Helper to check if we have valid tokens
export const hasValidTokens = () => {
  const cookieValue = Cookies.get(WIX_SESSION_COOKIE);
  if (!cookieValue) return false;
  
  try {
    const tokens = JSON.parse(cookieValue);
    return tokens && tokens.accessToken;
  } catch {
    return false;
  }
};

// Helper to refresh browser client with new tokens
export const refreshBrowserClient = () => {
  const cookieValue = Cookies.get(WIX_SESSION_COOKIE);
  let newTokens: Tokens | null = null;
  
  if (cookieValue) {
    try {
      newTokens = JSON.parse(cookieValue);
    } catch (error) {
      console.error("Failed to parse WIX_SESSION_COOKIE:", error);
    }
  }
  
  return getWixClient(newTokens || undefined);
};
