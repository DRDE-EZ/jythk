"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TestLoginPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  const testGoogleLogin = async () => {
    setLogs([]);
    setError(null);
    
    try {
      addLog("Starting test login...");
      
      // Import dynamically to avoid SSR issues
      const { enhancedAuth } = await import("@/lib/enhanced-auth");
      addLog("Enhanced auth module loaded");
      
      addLog("Calling loginWithGoogle...");
      await enhancedAuth.loginWithGoogle('/customer-dashboard-protected');
      
      addLog("Login initiated successfully");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      addLog(`ERROR: ${errorMessage}`);
      setError(errorMessage);
      console.error("Test login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Google Login Diagnostic Test</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
            <div className="bg-gray-900 p-4 rounded-lg space-y-2 font-mono text-sm">
              <div>Client ID: 5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e</div>
              <div>Callback URL: https://jythk.vercel.app/api/auth/callback/wix</div>
              <div>Redirect After Login: https://jythk.vercel.app/customer-dashboard-protected</div>
            </div>
          </div>

          <div>
            <Button 
              onClick={testGoogleLogin}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Test Google Sign-In
            </Button>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 p-4 rounded-lg">
              <h3 className="font-bold text-red-400 mb-2">Error Occurred:</h3>
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {logs.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Logs</h2>
              <div className="bg-gray-900 p-4 rounded-lg space-y-1 font-mono text-xs max-h-96 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="text-green-400">{log}</div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Open browser developer console (F12)</li>
              <li>Click "Test Google Sign-In" button</li>
              <li>Watch for logs in both the page and console</li>
              <li>Check if you're redirected to Google or get an error</li>
              <li>If you get "not found", check the Network tab for the failing request</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Common Issues</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>If you see "not found": The OAuth initialization might be failing</li>
              <li>If no redirect happens: Check browser console for JavaScript errors</li>
              <li>If redirect goes to wrong URL: Check Wix Dashboard OAuth redirect URLs</li>
              <li>If callback fails: Check that /api/auth/callback/wix route exists</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
