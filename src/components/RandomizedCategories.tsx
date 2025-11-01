import { getWixServerClient } from "@/lib/wix-client-server";
import { getCollections } from "@/wix-api/collections";
import Link from "next/link";
import { collections } from "@wix/stores";
import WixImage from "./WixImage";

export default async function RandomizedCategories({ limit = 6 }: { limit?: number }) {
  try {
    const wixClient = await getWixServerClient();
    const items = await getCollections(wixClient);
    
    // Validate that we have items
    if (!items || items.length === 0) {
      console.log("No collections found");
      return null;
    }
    
    // Debug: Log the first collection to see its structure (only in development)
    if (process.env.NODE_ENV === 'development' && items.length > 0) {
      console.log("First collection data:", JSON.stringify(items[0], null, 2));
      console.log("Media object:", items[0].media);
      console.log("Main media:", items[0].media?.mainMedia);
      console.log("Image URL:", items[0].media?.mainMedia?.image?.url);
    }
    
    // Filter out collections without names
    const validItems = items.filter(item => item.name && item.slug);
    
    // Shuffle
    for (let i = validItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [validItems[i], validItems[j]] = [validItems[j], validItems[i]];
    }
    
    const selected = validItems.slice(0, limit);
    if (!selected.length) return null;
    
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {selected.map((cat: collections.Collection) => {
          const hasImage = cat.media?.mainMedia?.image?.url;
          
          return (
            <Link key={cat._id} href={`/collections/${cat.slug}`}>
              <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer transform hover:scale-105 transition-all duration-500 bg-white border border-gray-200 shadow-lg hover:shadow-2xl">
                {/* Background Image */}
                {hasImage ? (
                  <div className="absolute inset-0">
                    <WixImage
                      mediaIdentifier={cat.media?.mainMedia?.image?.url}
                      alt={cat.media?.mainMedia?.image?.altText || cat.name || "Category"}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 transition-colors duration-300" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200" />
                )}
                
                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                  <h3 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300 ${hasImage ? 'text-white drop-shadow-lg' : 'text-gray-900'}`}>
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className={`text-lg sm:text-xl mb-6 group-hover:scale-105 transition-all line-clamp-2 ${hasImage ? 'text-white/90 drop-shadow-md' : 'text-gray-600'}`}>
                      {cat.description}
                    </p>
                  )}
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${hasImage ? 'border-white/80 group-hover:border-white bg-white/10 backdrop-blur-sm' : 'border-blue-600/60 group-hover:border-blue-600'}`}>
                    <svg className={`w-8 h-8 ${hasImage ? 'text-white' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  } catch (error) {
    console.error("Error loading collections:", error);
    // Return a fallback UI instead of crashing
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Unable to load collections at this time.</p>
      </div>
    );
  }
}