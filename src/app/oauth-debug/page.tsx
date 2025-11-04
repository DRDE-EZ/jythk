"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { enhancedAuth } from "@/lib/enhanced-auth";
import { toast } from "sonner";

export default function OAuthDebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const testWixHeadlessSetup = async () => {
    try {
      console.log("=== WIX HEADLESS SETUP TEST ===");
      
      // Test if we can create the Wix client
      const testClient = enhancedAuth;
      console.log("✅ Wix client created successfully");
      
      // Test OAuth data generation
      const oAuthData = await testClient.generateOAuthData('/customer-dashboard');
      console.log("✅ OAuth data generated:", oAuthData);
      
      setDebugInfo({
        test: "Wix Headless Setup",
        clientCreated: true,
        oauthDataGenerated: true,
        clientId: "8ddda745-5ec1-49f1-ab74-5cc13da5c94f",
        redirectUri: `${window.location.origin}/api/auth/callback/wix`,
        oauthData: oAuthData,
        timestamp: new Date().toISOString()
      });
      
      toast.success("Wix Headless setup is correctly configured!");
      
    } catch (error) {
      console.error("Wix Headless Setup Error:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      setDebugInfo({
        test: "Wix Headless Setup",
        error: errorMessage,
        clientId: "8ddda745-5ec1-49f1-ab74-5cc13da5c94f",
        redirectUri: `${window.location.origin}/api/auth/callback/wix`,
        timestamp: new Date().toISOString()
      });
      
      if (errorMessage.includes("Invalid redirect URI")) {
        toast.error("❌ Redirect URI not configured in Wix dashboard");
        setDebugInfo(prev => ({
          ...prev,
          redirectUriError: true,
          fixInstructions: {
            step1: "Go to https://manage.wix.com/account/api-keys",
            step2: "Find OAuth app with Client ID: 8ddda745-5ec1-49f1-ab74-5cc13da5c94f",
            step3: `Add this redirect URI: ${window.location.origin}/api/auth/callback/wix`,
            step4: "Save the changes and test again"
          }
        }));
      } else {
        toast.error(`❌ Setup Error: ${errorMessage}`);
      }
    }
  };

  const attemptGoogleLogin = async () => {
    try {
      toast.loading("Testing Google Login...");
      await enhancedAuth.loginWithGoogle();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Google Login Error:", error);
      toast.error(`Google Login Failed: ${errorMessage}`);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">🔧 OAuth Configuration Debug</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Info */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🔑 Wix Headless OAuth Config</h2>
          <div className="space-y-3 text-sm">
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <strong>✅ OAuth Type:</strong> Wix Headless (Client ID Only)
              <br />
              <span className="text-green-600">No client secret required!</span>
            </div>
            <div>
              <strong>Client ID:</strong>
              <br />
              <code className="bg-gray-100 p-2 rounded block text-xs break-all">
                8ddda745-5ec1-49f1-ab74-5cc13da5c94f
              </code>
            </div>
            <div>
              <strong>Required Redirect URI:</strong>
              <br />
              <code className="bg-blue-100 p-2 rounded block text-xs">
                http://localhost:3001/api/auth/callback/wix
              </code>
            </div>
            <div>
              <strong>Current Base URL:</strong>
              <br />
              <code className="bg-blue-100 p-2 rounded block text-xs">
                {typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001'}
              </code>
            </div>
            <div>
              <strong>Environment:</strong>
              <br />
              <span className="text-sm text-gray-600">
                {typeof window !== 'undefined' ? 'Browser' : 'Server'} | 
                {process.env.NODE_ENV || 'development'}
              </span>
            </div>
          </div>
        </div>

        {/* Test Actions */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🧪 Test Actions</h2>
          <div className="space-y-3">
            <Button 
              onClick={testWixHeadlessSetup}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              🔍 Test Wix Headless Setup
            </Button>
            
            <Button 
              onClick={attemptGoogleLogin}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              🚀 Try Google Login
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/simple-login'}
              variant="outline"
              className="w-full"
            >
              🔄 Fallback: Simple Login
            </Button>
          </div>
        </div>
      </div>

      {/* Debug Output */}
      {debugInfo && (
        <div className="mt-8 bg-gray-50 border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">📊 Debug Output</h3>
          <pre className="bg-black text-green-400 p-4 rounded text-sm overflow-auto max-h-96">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-4">ℹ️ Wix Headless OAuth Setup</h3>
        
        <div className="space-y-4 text-sm text-blue-700">
          <div className="bg-white p-3 rounded border-l-4 border-blue-400">
            <strong>✅ Good News:</strong> Wix Headless OAuth only requires a client ID (no client secret needed!)
            <br />
            <strong>Your Client ID:</strong> <code>8ddda745-5ec1-49f1-ab74-5cc13da5c94f</code>
          </div>
          
          <div>
            <strong>🔧 To Fix "Invalid redirect URI" Error:</strong>
          </div>
          
          <div className="ml-4 space-y-2">
            <div>
              <strong>1. Go to Wix Developer Dashboard:</strong>
              <br />
              <a href="https://dev.wix.com/" target="_blank" className="underline text-blue-600">
                https://dev.wix.com/
              </a>
            </div>
            
            <div>
              <strong>2. Find Your Headless App:</strong>
              <br />
              Look for app with Client ID: <code>8ddda745-5ec1-49f1-ab74-5cc13da5c94f</code>
            </div>
            
            <div>
              <strong>3. OAuth Settings:</strong>
              <br />
              In your app dashboard, find <strong>"OAuth"</strong> or <strong>"Redirect URIs"</strong> section
            </div>
            
            <div>
              <strong>4. Add This Exact Redirect URI:</strong>
              <br />
              <code className="bg-blue-100 px-2 py-1 rounded">http://localhost:3001/api/auth/callback/wix</code>
            </div>
            
            <div>
              <strong>5. Enable Required Permissions:</strong>
              <br />
              ✅ Site Members<br />
              ✅ Identity<br />
              ✅ OAuth (if available)
            </div>
            
            <div>
              <strong>6. Save & Test:</strong>
              <br />
              Save settings and try the Google Login button above
            </div>
          </div>
          
          <div className="bg-green-100 p-3 rounded border-l-4 border-green-400 mt-4">
            <strong>💡 Pro Tip:</strong> If you can't find OAuth settings, your app might need to be configured as a "Headless" app type during creation.
          </div>
        </div>
      </div>
    </div>
  );
}