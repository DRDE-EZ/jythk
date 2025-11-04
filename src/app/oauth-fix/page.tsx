'use client';

import { useState } from 'react';

export default function OAuthSetupGuide() {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const redirectUri = 'http://localhost:3001/api/auth/callback/wix';
  const clientId = '8ddda745-5ec1-49f1-ab74-5cc13da5c94f';

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Fix OAuth Redirect URI Error
          </h1>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-red-800 font-medium">Current Error:</h3>
            <p className="text-red-700 mt-1">
              "Invalid redirect URI. Please add an allowed URI to your Oauth App"
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h3 className="text-blue-800 font-medium mb-2">Required Information:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between bg-white p-2 rounded border">
                <span><strong>Client ID:</strong> {clientId}</span>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded border">
                <span><strong>Redirect URI:</strong> {redirectUri}</span>
                <button
                  onClick={() => copyToClipboard(redirectUri)}
                  className="ml-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`border rounded-lg p-4 ${step === 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
              <div className="flex items-center mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 1 ? 'bg-blue-600' : 'bg-gray-400'}`}>
                  1
                </div>
                <h3 className="ml-3 text-lg font-medium">Access Wix Dashboard</h3>
              </div>
              <div className="ml-11">
                <p className="text-gray-700 mb-3">
                  Go to your Wix dashboard and navigate to the OAuth app settings.
                </p>
                <a 
                  href="https://manage.wix.com/account/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Open Wix API Keys Dashboard
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button
                  onClick={() => setStep(2)}
                  className="ml-3 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Next Step
                </button>
              </div>
            </div>

            <div className={`border rounded-lg p-4 ${step === 2 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
              <div className="flex items-center mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 2 ? 'bg-blue-600' : 'bg-gray-400'}`}>
                  2
                </div>
                <h3 className="ml-3 text-lg font-medium">Find Your OAuth App</h3>
              </div>
              <div className="ml-11">
                <p className="text-gray-700 mb-3">
                  Look for the OAuth app with Client ID: <code className="bg-gray-100 px-2 py-1 rounded">{clientId}</code>
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                  <li>It might be listed under "API Keys" or "OAuth Apps"</li>
                  <li>Look for "Headless" or "OAuth Strategy" type applications</li>
                  <li>Check if it's named something like "My App" or "Website Integration"</li>
                </ul>
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Found It - Next Step
                </button>
              </div>
            </div>

            <div className={`border rounded-lg p-4 ${step === 3 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
              <div className="flex items-center mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 3 ? 'bg-blue-600' : 'bg-gray-400'}`}>
                  3
                </div>
                <h3 className="ml-3 text-lg font-medium">Add Redirect URI</h3>
              </div>
              <div className="ml-11">
                <p className="text-gray-700 mb-3">
                  Add this exact redirect URI to your OAuth app settings:
                </p>
                <div className="bg-gray-100 p-3 rounded border mb-3 font-mono text-sm">
                  {redirectUri}
                </div>
                <p className="text-gray-700 mb-3">
                  Look for sections named:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                  <li><strong>"Redirect URIs"</strong></li>
                  <li><strong>"Authorized Redirect URIs"</strong></li>
                  <li><strong>"Callback URLs"</strong></li>
                  <li><strong>"OAuth Redirect URIs"</strong></li>
                </ul>
                <button
                  onClick={() => setStep(4)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Added URI - Next Step
                </button>
              </div>
            </div>

            <div className={`border rounded-lg p-4 ${step === 4 ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
              <div className="flex items-center mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 4 ? 'bg-green-600' : 'bg-gray-400'}`}>
                  4
                </div>
                <h3 className="ml-3 text-lg font-medium">Test Your OAuth Flow</h3>
              </div>
              <div className="ml-11">
                <p className="text-gray-700 mb-3">
                  After adding the redirect URI, test your authentication:
                </p>
                <div className="space-y-2">
                  <a
                    href="/oauth-debug"
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Test OAuth Flow
                  </a>
                  <a
                    href="/customer-dashboard"
                    className="inline-block ml-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Go to Customer Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-yellow-800 font-medium mb-2">Important Notes:</h3>
            <ul className="text-yellow-700 space-y-1 text-sm">
              <li>• The redirect URI must match exactly (including protocol, port, and path)</li>
              <li>• For production, you'll need to add your production domain redirect URI</li>
              <li>• Some changes in Wix dashboard may take a few minutes to take effect</li>
              <li>• Make sure you're editing the correct OAuth app (check the Client ID)</li>
            </ul>
          </div>

          <div className="mt-6 bg-gray-100 rounded-lg p-4">
            <h3 className="text-gray-800 font-medium mb-2">Current Configuration:</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Environment:</strong> Development (localhost:3001)</p>
              <p><strong>OAuth Strategy:</strong> Wix Headless</p>
              <p><strong>Client ID:</strong> {clientId}</p>
              <p><strong>Callback Path:</strong> /api/auth/callback/wix</p>
              <p><strong>Expected Redirect URI:</strong> {redirectUri}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}