"use client";

import { useEffect, useState } from "react";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DebugAuthPage() {
  const [authStatus, setAuthStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<any>({});

  useEffect(() => {
    async function checkAuth() {
      const results: any = {};
      
      try {
        // Check if logged in
        results.isLoggedIn = await wixBrowserClient.auth.loggedIn();
        
        // Check environment variables
        results.clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
        results.siteId = process.env.NEXT_PUBLIC_WIX_SITE_ID;
        results.baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        results.redirectUrl = process.env.NEXT_PUBLIC_WIX_REDIRECT_URL;
        
        // Check cookies
        results.cookies = document.cookie;
        
        // Try to get member if logged in
        if (results.isLoggedIn) {
          try {
            const member = await wixBrowserClient.members.getCurrentMember();
            results.member = member;
          } catch (err: any) {
            results.memberError = err.message;
          }
        }
        
        setTestResults(results);
      } catch (error: any) {
        results.error = error.message;
        setTestResults(results);
      } finally {
        setLoading(false);
      }
    }
    
    checkAuth();
  }, []);

  const testGoogleLogin = async () => {
    try {
      console.log("Testing Google login...");
      const { generateOAuthData, getGoogleLoginUrl } = await import("@/wix-api/auth");
      
      const oAuthData = await generateOAuthData(wixBrowserClient, "/debug-auth");
      console.log("OAuth data:", oAuthData);
      
      const authUrl = await getGoogleLoginUrl(wixBrowserClient, oAuthData);
      console.log("Auth URL:", authUrl);
      
      setTestResults((prev: any) => ({ ...prev, authUrl }));
      
      alert(`Auth URL generated: ${authUrl}\n\nCheck console for details. Click OK to redirect.`);
      window.location.href = authUrl;
    } catch (error: any) {
      console.error("Login test error:", error);
      setTestResults((prev: any) => ({ ...prev, loginError: error.message }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6">🔍 Authentication Debug</h1>
          
          <div className="space-y-6">
            {/* Auth Status */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-3">Authentication Status</h2>
              <div className="bg-gray-50 p-4 rounded">
                <p className="mb-2">
                  <strong>Logged In:</strong>{" "}
                  <span className={testResults.isLoggedIn ? "text-green-600" : "text-red-600"}>
                    {testResults.isLoggedIn ? "✅ Yes" : "❌ No"}
                  </span>
                </p>
                {testResults.member && (
                  <div className="mt-2">
                    <strong>Member:</strong>
                    <pre className="mt-2 bg-white p-2 rounded text-xs overflow-auto">
                      {JSON.stringify(testResults.member, null, 2)}
                    </pre>
                  </div>
                )}
                {testResults.memberError && (
                  <p className="text-red-600 mt-2">
                    <strong>Member Error:</strong> {testResults.memberError}
                  </p>
                )}
              </div>
            </div>

            {/* Environment Variables */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-3">Environment Variables</h2>
              <div className="bg-gray-50 p-4 rounded space-y-2">
                <p>
                  <strong>Client ID:</strong>{" "}
                  <code className="bg-white px-2 py-1 rounded text-sm">
                    {testResults.clientId || "❌ Missing"}
                  </code>
                </p>
                <p>
                  <strong>Site ID:</strong>{" "}
                  <code className="bg-white px-2 py-1 rounded text-sm">
                    {testResults.siteId || "❌ Missing"}
                  </code>
                </p>
                <p>
                  <strong>Base URL:</strong>{" "}
                  <code className="bg-white px-2 py-1 rounded text-sm">
                    {testResults.baseUrl || "❌ Missing"}
                  </code>
                </p>
                <p>
                  <strong>Redirect URL:</strong>{" "}
                  <code className="bg-white px-2 py-1 rounded text-sm">
                    {testResults.redirectUrl || "❌ Missing"}
                  </code>
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-3">Cookies</h2>
              <div className="bg-gray-50 p-4 rounded">
                {testResults.cookies ? (
                  <pre className="text-xs overflow-auto whitespace-pre-wrap">
                    {testResults.cookies.split('; ').join('\n')}
                  </pre>
                ) : (
                  <p className="text-gray-500">No cookies found</p>
                )}
              </div>
            </div>

            {/* Auth URL Test */}
            {testResults.authUrl && (
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold mb-3">Generated Auth URL</h2>
                <div className="bg-gray-50 p-4 rounded">
                  <pre className="text-xs overflow-auto whitespace-pre-wrap break-all">
                    {testResults.authUrl}
                  </pre>
                </div>
              </div>
            )}

            {/* Errors */}
            {(testResults.error || testResults.loginError) && (
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold mb-3 text-red-600">Errors</h2>
                <div className="bg-red-50 p-4 rounded">
                  {testResults.error && <p className="text-red-600 mb-2">{testResults.error}</p>}
                  {testResults.loginError && <p className="text-red-600">{testResults.loginError}</p>}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-semibold mb-3">Test Actions</h2>
              <div className="flex gap-4 flex-wrap">
                <Button onClick={testGoogleLogin} className="bg-blue-600 hover:bg-blue-700">
                  🧪 Test Google Login
                </Button>
                <Link href="/login">
                  <Button variant="outline">Go to Login Page</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">Go to Home</Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    document.cookie.split(";").forEach((c) => {
                      document.cookie = c
                        .replace(/^ +/, "")
                        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                    });
                    window.location.reload();
                  }}
                >
                  Clear All Cookies
                </Button>
              </div>
            </div>

            {/* Full Test Results */}
            <details className="pt-4">
              <summary className="text-lg font-semibold cursor-pointer">
                📋 Full Test Results (Click to expand)
              </summary>
              <div className="bg-gray-50 p-4 rounded mt-4">
                <pre className="text-xs overflow-auto">
                  {JSON.stringify(testResults, null, 2)}
                </pre>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
