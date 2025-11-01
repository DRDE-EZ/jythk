console.log("=== ENVIRONMENT DEBUG ===");
console.log("Raw process.env.NEXT_PUBLIC_WIX_SITE_ID:", process.env.NEXT_PUBLIC_WIX_SITE_ID);
console.log("Raw process.env.NEXT_PUBLIC_WIX_CLIENT_ID:", process.env.NEXT_PUBLIC_WIX_CLIENT_ID);
console.log("Raw process.env.WIX_API_KEY exists:", !!process.env.WIX_API_KEY);

// Try loading env
try {
  const { env } = require('./src/env.ts');
  console.log("env.NEXT_PUBLIC_WIX_SITE_ID:", env.NEXT_PUBLIC_WIX_SITE_ID);
  console.log("env.NEXT_PUBLIC_WIX_CLIENT_ID:", env.NEXT_PUBLIC_WIX_CLIENT_ID);
  console.log("env.WIX_API_KEY exists:", !!env.WIX_API_KEY);
} catch (error) {
  console.error("Error loading env:", error.message);
}

console.log("========================");