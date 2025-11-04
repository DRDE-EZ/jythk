"use client";

import { useState } from "react";
import { enhancedAuth } from "@/lib/enhanced-auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EnhancedAuthTestPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [member, setMember] = useState<any>(null);

  const testGoogleLogin = async () => {
    try {
      toast.loading("Redirecting to Google...");
      await enhancedAuth.loginWithGoogle();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
    }
  };

  const testEmailLogin = async () => {
    try {
      toast.loading("Redirecting to login...");
      await enhancedAuth.loginWithEmail();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const result = await enhancedAuth.getProducts();
      if (result.success) {
        setProducts(result.products);
        toast.success(`Fetched ${result.total} products!`);
      } else {
        toast.error(`Failed to fetch products: ${result.error}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch products";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentMember = async () => {
    try {
      const currentMember = await enhancedAuth.getCurrentMember();
      setMember(currentMember);
      if (currentMember) {
        toast.success("Member data fetched!");
      } else {
        toast.info("No member logged in");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to get member";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">🚀 Enhanced Wix Authentication Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Authentication Section */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🔐 Authentication</h2>
          <div className="space-y-3">
            <Button 
              onClick={testGoogleLogin}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              🔴 Google Login (New Client)
            </Button>
            <Button 
              onClick={testEmailLogin}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              📧 Email Login (New Client)
            </Button>
            <Button 
              onClick={getCurrentMember}
              variant="outline"
              className="w-full"
            >
              👤 Get Current Member
            </Button>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📦 Products</h2>
          <Button 
            onClick={fetchProducts}
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            {isLoading ? "Fetching..." : "Fetch Products"}
          </Button>
          {products.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              Found {products.length} products
            </p>
          )}
        </div>

        {/* Status Section */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Status</h2>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Client ID:</strong> 
              <br />
              <code className="text-xs bg-gray-100 p-1 rounded">
                8ddda745-5ec1-49f1-ab74-5cc13da5c94f
              </code>
            </div>
            <div>
              <strong>Member:</strong> {member ? "✅ Logged in" : "❌ Not logged in"}
            </div>
            <div>
              <strong>Products:</strong> {products.length} loaded
            </div>
          </div>
        </div>
      </div>

      {/* Member Data Display */}
      {member && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-3">👤 Member Information</h3>
          <pre className="bg-white p-4 rounded text-sm overflow-auto">
            {JSON.stringify(member, null, 2)}
          </pre>
        </div>
      )}

      {/* Products Display */}
      {products.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">📦 Products ({products.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 6).map((product, index) => (
              <div key={index} className="bg-white p-4 rounded border">
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.description?.substring(0, 100)}...</p>
                {product.price && (
                  <p className="text-lg font-bold text-green-600">
                    ${product.price.price}
                  </p>
                )}
              </div>
            ))}
          </div>
          {products.length > 6 && (
            <p className="text-center text-gray-600 mt-4">
              ... and {products.length - 6} more products
            </p>
          )}
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-semibold text-yellow-800 mb-2">🔍 What This Tests:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
          <li>New Wix Client ID: <code>8ddda745-5ec1-49f1-ab74-5cc13da5c94f</code></li>
          <li>Google OAuth authentication flow</li>
          <li>Email-based Wix authentication</li>
          <li>Product fetching with OAuth strategy</li>
          <li>Member data retrieval</li>
          <li>Enhanced error handling and logging</li>
        </ul>
      </div>
    </div>
  );
}