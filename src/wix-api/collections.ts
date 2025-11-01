import { UnifiedWixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

export const getCollectionBySlug = cache(
  async (wixClient: UnifiedWixClient, slug: string) => {
    try {
      const { collection } = await wixClient.collections.getCollectionBySlug(slug);
      return collection || null;
    } catch (error) {
      console.error("Error fetching collection by slug:", error);
      return null;
    }
  }
);

export const getCollections = cache(
  async (wixClient: UnifiedWixClient): Promise<collections.Collection[]> => {
    try {
      const result = await wixClient.collections
        .queryCollections()
        .ne("_id", "edc168bd-f829-d9f8-932b-afe927c9bb56")
        .ne("_id", "00000000-000000-000000-000000000001")
        .find();

      return result.items || [];
    } catch (error) {
      console.error("Error fetching collections:", error);
      return [];
    }
  }
);
