import { createClient, OAuthStrategy, OauthData } from "@wix/sdk";
import { members } from "@wix/members";
import { contacts } from "@wix/crm";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { checkAdminRole } from "@/lib/admin-config";

// Use new Wix headless site client ID
const CLIENT_ID = '5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e';
const WIX_SESSION_COOKIE = `wix_session_${CLIENT_ID}`;
const WIX_OAUTH_DATA_COOKIE = `wix_oauth_data_${CLIENT_ID}`;

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
  const oAuthDataParam = req.nextUrl.searchParams.get("oauth_data");
  
  console.log("OAuth data cookie:", oAuthDataCookie);
  console.log("OAuth data query param:", oAuthDataParam ? "present" : "missing");
  console.log("WIX_OAUTH_DATA_COOKIE constant:", WIX_OAUTH_DATA_COOKIE);

  if (!code || !state) {
    console.log("Missing code or state");
    return new Response("Missing code or state", { status: 400 });
  }

  // Try cookie first, fall back to query parameter
  const oAuthDataString = oAuthDataCookie || oAuthDataParam;
  
  if (!oAuthDataString) {
    console.log("Missing OAuth data (checked both cookie and query param)");
    // Return HTML that will retrieve from sessionStorage and retry
    return new Response(
      `<!DOCTYPE html>
      <html>
      <head><title>Completing Sign In...</title></head>
      <body>
        <script>
          const cookieName = '${WIX_OAUTH_DATA_COOKIE}';
          const oAuthData = sessionStorage.getItem(cookieName);
          if (oAuthData) {
            const url = new URL(window.location.href);
            url.searchParams.set('oauth_data', oAuthData);
            window.location.href = url.toString();
          } else {
            document.body.innerHTML = '<p>Authentication failed: Missing OAuth data. Please try signing in again.</p>';
          }
        </script>
      </body>
      </html>`,
      { 
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }

  let oAuthData: OauthData;
  try {
    oAuthData = JSON.parse(oAuthDataString);
    console.log("Parsed OAuth data:", oAuthData);
  } catch (error) {
    console.log("Failed to parse OAuth data:", error);
    return new Response("Invalid OAuth data", { status: 400 });
  }

  console.log("About to call getMemberTokens...");

  try {
    // Create OAuth client for token exchange using consistent client ID
    const wixClient = createClient({
      modules: { members, contacts },
      auth: OAuthStrategy({
        clientId: CLIENT_ID
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

    // Set tokens and get member info
    wixClient.auth.setTokens(memberTokens);
    
    // Get member to extract email
    let redirectPath = oAuthData.originalUri || "/customer-dashboard-protected";
    
    try {
      const currentMember = await wixClient.members.getCurrentMember();
      console.log("📧 Got member data");
      
      if (currentMember && currentMember.member) {
        const memberData = currentMember.member as any;
        const userEmail = memberData.loginEmail || memberData.contact?.emails?.[0] || '';
        
        console.log("📧 User email:", userEmail);
        
        if (userEmail) {
          const userRole = checkAdminRole(userEmail);
          console.log("🔍 User role:", userRole);
          
          // Redirect admins to admin dashboard by default
          if ((userRole === 'admin' || userRole === 'super_admin') && 
              (!oAuthData.originalUri || 
               oAuthData.originalUri === '/profile' || 
               oAuthData.originalUri.includes('/customer-dashboard'))) {
            redirectPath = '/admin-dashboard';
            console.log("✅ Admin user - redirecting to admin dashboard");
          }
        }
      }
    } catch (err) {
      console.error("Error checking member:", err);
      // Continue with default redirect
    }

    console.log("Redirecting to:", redirectPath);
    console.log("=== CALLBACK DEBUG END ===");

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectPath,
      },
    });
  } catch (error) {
    console.error("getMemberTokens failed:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Return HTML with detailed error for debugging
    return new Response(
      `<!DOCTYPE html>
      <html>
      <head><title>Login Failed</title></head>
      <body style="font-family: sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
        <h1>🔴 Authentication Failed</h1>
        <p><strong>Error:</strong> ${errorMessage}</p>
        <h3>Troubleshooting Steps:</h3>
        <ol>
          <li>Verify the redirect URL is configured in Wix Dashboard:
            <br><code>https://jythk.vercel.app/api/auth/callback/wix</code>
          </li>
          <li>Clear browser cookies and cache</li>
          <li>Try in incognito/private browsing mode</li>
          <li>Check that your Wix Client ID is correct: <code>${CLIENT_ID}</code></li>
        </ol>
        <p><a href="/" style="color: blue;">Return to Home</a> | <a href="/test-login" style="color: blue;">Test Login Page</a></p>
        <hr>
        <details>
          <summary>Technical Details (click to expand)</summary>
          <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${JSON.stringify({
            code: code ? 'present' : 'missing',
            state: state ? 'present' : 'missing',
            oAuthData: oAuthData ? 'parsed successfully' : 'missing',
            clientId: CLIENT_ID,
            error: errorMessage
          }, null, 2)}</pre>
        </details>
      </body>
      </html>`,
      { 
        status: 400,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}
