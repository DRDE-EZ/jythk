import { WIX_OAUTH_DATA_COOKIE, WIX_SESSION_COOKIE } from "@/lib/constants";
import { getWixServerClient } from "@/lib/wix-client-server";
import { OauthData } from "@wix/sdk";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const error = req.nextUrl.searchParams.get("error");
  const error_description = req.nextUrl.searchParams.get("error_description");

  console.log("Callback params:", { code, state, error }); // Debug log

  if (error) {
    return new Response(error_description, { status: 400 });
  }

  // Fix the OAuth data validation
  const oAuthDataCookie = (await cookies()).get(WIX_OAUTH_DATA_COOKIE)?.value;

  if (!code || !state || !oAuthDataCookie) {
    console.log("Missing required data:", {
      code: !!code,
      state: !!state,
      cookie: !!oAuthDataCookie,
    });
    return new Response("Missing required OAuth data", { status: 400 });
  }

  let oAuthData: OauthData;
  try {
    oAuthData = JSON.parse(oAuthDataCookie);
  } catch (error) {
    console.error("Failed to parse OAuth data:", error);
    return new Response("Invalid OAuth data", { status: 400 });
  }

  // Validate that oAuthData has required properties
  if (!oAuthData.codeChallenge || !oAuthData.state) {
    console.log("Invalid OAuth data structure:", oAuthData);
    return new Response("Invalid OAuth data structure", { status: 400 });
  }

  // Rest of your code...
  const wixClient = getWixServerClient();
  const client = await wixClient;

  try {
    const memberTokens = await client.auth.getMemberTokens(
      code,
      state,
      oAuthData
    );

    (await cookies()).delete(WIX_OAUTH_DATA_COOKIE);
    (await cookies()).set(WIX_SESSION_COOKIE, JSON.stringify(memberTokens), {
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: oAuthData.originalUri || "/",
      },
    });
  } catch (error) {
    console.error("Token exchange failed:", error);
    return new Response("Authentication failed", { status: 400 });
  }
}
