import React from "react";
import { getWixServerClient } from "@/lib/wix-client-server";
import { queryProducts } from "@/wix-api/products";
import HeroBannerClient from "./HeroBannerClient";

export default async function HeroBannerServer({
  limit = 6,
}: {
  limit?: number;
}) {
  try {
    const wixClient = await getWixServerClient();

    // Fetch a larger set then randomize server-side to ensure variety
    const result = await queryProducts(wixClient, { itemLimit: 40 });
    const items = result?.items || [];

    // Shuffle and pick `limit`
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    const selected = items.slice(0, limit);

    return <HeroBannerClient products={selected} />;
  } catch (err) {
    console.error("Failed to fetch hero products:", err);
    return null;
  }
}
