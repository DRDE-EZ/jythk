'use client';

import { useState } from 'react';
import { getServerWixClient, getWixApiKey, makeAuthenticatedRequest } from '@/lib/wix-client-official';

export default function WixSdkTestPage() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testWixConnection = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Test 1: Check API key
      const apiKey = getWixApiKey();
      const hasApiKey = !!apiKey;
      
      // Test 2: Create client
      const client = getServerWixClient();
      
      // Test 3: Try to fetch products
      const productsResponse = await makeAuthenticatedRequest(client, async () => {
        return await client.products.queryProducts().find();
      });

      // Test 4: Try to fetch collections
      const collectionsResponse = await makeAuthenticatedRequest(client, async () => {
        return await client.collections.queryCollections().find();
      });

      setResults({
        hasApiKey,
        apiKeyLength: apiKey?.length || 0,
        apiKeyPrefix: apiKey?.substring(0, 20) + '...',
        productsCount: productsResponse?.items?.length || 0,
        collectionsCount: collectionsResponse?.items?.length || 0,
        products: productsResponse?.items?.slice(0, 3) || [],
        collections: collectionsResponse?.items?.slice(0, 3) || [],
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred');
      console.error('Wix SDK test error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testProductCreation = async () => {
    setLoading(true);
    setError(null);

    try {
      const client = getServerWixClient();
      
      // Test creating a product
      const newProduct = await makeAuthenticatedRequest(client, async () => {
        return await client.products.createProduct({
          name: 'Test Product - ' + Date.now(),
          productType: 'physical',
          priceData: {
            price: 29.99,
            currency: 'USD',
          },
          visible: true,
        });
      });

      setResults({
        createdProduct: newProduct,
        productId: newProduct?.product?.id,
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
      console.error('Product creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Official Wix SDK Test
          </h1>
          
          <div className="space-y-4 mb-8">
            <button
              onClick={testWixConnection}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Testing...' : 'Test Wix Connection & Data Fetch'}
            </button>
            
            <button
              onClick={testProductCreation}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors ml-4"
            >
              {loading ? 'Creating...' : 'Test Product Creation'}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="text-red-800 font-medium">Error:</h3>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          )}

          {results && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-green-800 font-medium mb-2">Test Results:</h3>
              <pre className="text-sm text-gray-700 overflow-auto max-h-96">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-800 font-medium mb-2">OAuth Token Info:</h3>
            <p className="text-sm text-gray-600">
              Your OAuth token has been updated in the environment variables and should provide
              authenticated access to Wix APIs including product management, collections, and more.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p><strong>Client ID:</strong> {process.env.NEXT_PUBLIC_WIX_CLIENT_ID}</p>
              <p><strong>API Key:</strong> {getWixApiKey() ? 'Set ✅' : 'Not Set ❌'}</p>
              <p><strong>API Key Length:</strong> {getWixApiKey()?.length || 0} characters</p>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="text-blue-800 font-medium mb-2">Available APIs:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✅ Products API - Create, read, update, delete products</li>
              <li>✅ Collections API - Manage product collections</li>
              <li>✅ Members API - Customer management</li>
              <li>✅ Stores API - Store configuration and settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}