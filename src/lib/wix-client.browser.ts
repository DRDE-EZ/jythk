import { Tokens } from "@wix/sdk";
import Cookies from "js-cookie";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client.base";

let tokens: Tokens | null = null;

const cookieValue = Cookies.get(WIX_SESSION_COOKIE);

if (cookieValue) {
  try {
    tokens = JSON.parse(cookieValue);
  } catch (error) {
    console.error("Failed to parse WIX_SESSION_COOKIE:", error);
  }
}

export const wixBrowserClient = tokens ? getWixClient(tokens) : null;
