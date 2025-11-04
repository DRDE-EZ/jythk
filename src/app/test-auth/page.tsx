"use client";

import { useState } from "react";
import useAuth from "@/hooks/auth";

export default function TestAuthPage() {
  const { login, loginWithGoogle } = useAuth();
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  const testGoogleLogin = async () => {
    addLog("🚀 Starting Google login test...");
    
    // Override console.log to capture logs
    const originalLog = console.log;
    console.log = (...args) => {
      addLog(`LOG: ${args.join(" ")}`);
      originalLog(...args);
    };

    try {
      addLog("📞 Calling loginWithGoogle()...");
      await loginWithGoogle();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      addLog(`❌ Error: ${errorMessage}`);
      console.error("Auth test error:", error);
    } finally {
      console.log = originalLog;
    }
  };

  const testRegularLogin = async () => {
    addLog("🚀 Starting regular login test...");
    
    try {
      addLog("📞 Calling login()...");
      await login();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      addLog(`❌ Error: ${errorMessage}`);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">🔧 Authentication Debug Tool</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={testGoogleLogin}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Test Google Login
        </button>
        
        <button
          onClick={testRegularLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Regular Login
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Debug Logs:</h2>
        <div className="bg-black text-green-400 p-3 rounded font-mono text-sm max-h-96 overflow-y-auto">
          {logs.length === 0 ? (
            <div className="text-gray-500">No logs yet. Click a button to test authentication.</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1">{log}</div>
            ))
          )}
        </div>
        
        <button
          onClick={() => setLogs([])}
          className="mt-2 bg-gray-500 text-white px-3 py-1 rounded text-sm"
        >
          Clear Logs
        </button>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">🔍 What to Check in Wix Dashboard:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700">
          <li>Go to <a href="https://dev.wix.com/" target="_blank" className="underline">Wix Developers</a></li>
          <li>Find your app with Client ID: <code className="bg-yellow-100 px-1 rounded">cbf77863-cedf-4588-b7a8-fc430cf6a816</code></li>
          <li>Look for <strong>"OAuth"</strong> or <strong>"Authentication"</strong> settings</li>
          <li>Add this redirect URL: <code className="bg-yellow-100 px-1 rounded">http://localhost:3001/api/auth/callback/wix</code></li>
          <li>Enable <strong>"Members/Site Members"</strong> permissions</li>
          <li>Save the settings and try again</li>
        </ol>
      </div>
    </div>
  );
}