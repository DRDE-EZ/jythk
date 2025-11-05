import { getWixServerClient } from "@/lib/wix-client-server";
import { getCollections } from "@/wix-api/collections";
import RandomizedCategoriesClient from "./RandomizedCategoriesClient";

export default async function RandomizedCategories({ limit = 6 }: { limit?: number }) {
  try {
    const wixClient = await getWixServerClient();
    const items = await getCollections(wixClient);
    
    if (!items || items.length === 0) {
      return null;
    }
    
    return <RandomizedCategoriesClient items={items} limit={limit} />;
  } catch (error) {
    console.error("Error loading collections:", error);
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Unable to load collections at this time.</p>
      </div>
    );
  }
}
