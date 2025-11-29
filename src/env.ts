import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    WIX_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_WIX_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_WIX_SITE_ID: z.string().min(1),
    NEXT_PUBLIC_WIX_REDIRECT_URL: z.string().url().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
    NEXT_PUBLIC_WIX_CLIENT_ID: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    NEXT_PUBLIC_WIX_SITE_ID: process.env.NEXT_PUBLIC_WIX_SITE_ID,
    NEXT_PUBLIC_WIX_REDIRECT_URL: process.env.NEXT_PUBLIC_WIX_REDIRECT_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api/auth/callback/wix` : 'http://localhost:3001/api/auth/callback/wix'),
  },
});
