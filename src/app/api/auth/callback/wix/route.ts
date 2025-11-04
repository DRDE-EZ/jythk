import { WIX_OAUTH_DATA_COOKIE, WIX_SESSION_COOKIE } from "@/lib/constants";
import { createClient, OAuthStrategy, OauthData } from "@wix/sdk";
import { members } from "@wix/members";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log("=== CALLBACK DEBUG START ===");
  console.log("Full URL:", req.url);
  console.log(
    "Search params:",
    Object.fromEntries(req.nextUrl.searchParams.entries())
  );

  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const error = req.nextUrl.searchParams.get("error");
  const error_description = req.nextUrl.searchParams.get("error_description");

  console.log("Extracted params:", { code, state, error, error_description });

  if (error) {
    console.log("OAuth error detected:", error, error_description);
    return new Response(error_description, { status: 400 });
  }

  // Check all cookies
  const allCookies = await cookies();
  console.log(
    "All cookies:",
    Object.fromEntries(
      Array.from(
        allCookies.getAll().map((cookie) => [cookie.name, cookie.value])
      )
    )
  );

  const oAuthDataCookie = allCookies.get(WIX_OAUTH_DATA_COOKIE)?.value;
  console.log("OAuth data cookie:", oAuthDataCookie);
  console.log("WIX_OAUTH_DATA_COOKIE constant:", WIX_OAUTH_DATA_COOKIE);

  if (!code || !state) {
    console.log("Missing code or state");
    return new Response("Missing code or state", { status: 400 });
  }

  if (!oAuthDataCookie) {
    console.log("Missing OAuth data cookie");
    return new Response("Missing OAuth data cookie", { status: 400 });
  }

  let oAuthData: OauthData;
  try {
    oAuthData = JSON.parse(oAuthDataCookie);
    console.log("Parsed OAuth data:", oAuthData);
  } catch (error) {
    console.log("Failed to parse OAuth data:", error);
    return new Response("Invalid OAuth data", { status: 400 });
  }

  console.log("About to call getMemberTokens...");

  try {
    // Create OAuth client for token exchange using new client ID
    const wixClient = createClient({
      modules: { members },
      auth: OAuthStrategy({
        clientId: '8ddda745-5ec1-49f1-ab74-5cc13da5c94f'
      })
    });

    const memberTokens = await wixClient.auth.getMemberTokens(
      code,
      state,
      oAuthData
    );
    console.log("Got member tokens:", memberTokens);

    allCookies.delete(WIX_OAUTH_DATA_COOKIE);
    allCookies.set(WIX_SESSION_COOKIE, JSON.stringify(memberTokens), {
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });

    console.log("Redirecting to:", oAuthData.originalUri || "/profile");
    console.log("=== CALLBACK DEBUG END ===");

    return new Response(null, {
      status: 302,
      headers: {
        Location: oAuthData.originalUri || "/profile",
      },
    });
  } catch (error) {
    console.error("getMemberTokens failed:", error);
    return new Response(`Authentication failed: ${error}`, { status: 400 });
  }
}
