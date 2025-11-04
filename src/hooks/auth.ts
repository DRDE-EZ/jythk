import { WIX_OAUTH_DATA_COOKIE, WIX_SESSION_COOKIE } from "@/lib/constants";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { generateOAuthData, getLoginUrl, getGoogleLoginUrl, getLogoutUrl } from "@/wix-api/auth";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function useAuth() {
  const pathname = usePathname();

  async function login() {
    try {
      if (!wixBrowserClient) return null;
      const oAuthData = await generateOAuthData(wixBrowserClient, pathname);
      Cookies.set(WIX_OAUTH_DATA_COOKIE, JSON.stringify(oAuthData), {
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 60 * 10 * 1000),
      });

      const redirectUrl = await getLoginUrl(wixBrowserClient, oAuthData);

      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
      toast.error("Failed to login. Please, try again!");
    }
  }

  async function loginWithGoogle() {
    try {
      if (!wixBrowserClient) return null;
      const oAuthData = await generateOAuthData(wixBrowserClient, pathname);
      Cookies.set(WIX_OAUTH_DATA_COOKIE, JSON.stringify(oAuthData), {
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 60 * 10 * 1000),
      });

      const redirectUrl = await getGoogleLoginUrl(wixBrowserClient, oAuthData);

      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
      toast.error("Failed to login with Google. Please, try again!");
    }
  }

  async function logout() {
    try {
      if (!wixBrowserClient) return null;
      const logoutUrl = await getLogoutUrl(wixBrowserClient);

      Cookies.remove(WIX_SESSION_COOKIE);

      window.location.href = logoutUrl;
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout. Please, try again!");
    }
  }

  return { login, loginWithGoogle, logout };
}
