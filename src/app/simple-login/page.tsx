"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function SimpleLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSimpleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simple local authentication for demo purposes
      if (email && name) {
        // Store user data locally
        const userData = {
          email,
          name,
          loginTime: new Date().toISOString(),
          id: `local_${Date.now()}`
        };

        Cookies.set("simple_user_session", JSON.stringify(userData), {
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === "production"
        });

        toast.success("Welcome! You're now logged in.");
        router.push("/profile");
      } else {
        toast.error("Please fill in all fields.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">
            Simple login to access your account and orders
          </p>
        </div>
        
        <form onSubmit={handleSimpleLogin} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <div>
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Demo Mode:</strong> This is a simplified login that stores your session locally. 
            For full Wix OAuth integration, we need to configure OAuth settings in your Wix dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}