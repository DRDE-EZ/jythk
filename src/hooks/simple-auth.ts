import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface SimpleUser {
  email: string;
  name: string;
  loginTime: string;
  id: string;
}

export function useSimpleAuth() {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const sessionData = Cookies.get("simple_user_session");
        if (sessionData) {
          const userData = JSON.parse(sessionData);
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    Cookies.remove("simple_user_session");
    setUser(null);
    window.location.href = "/";
  };

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    isLoading,
    logout
  };
}