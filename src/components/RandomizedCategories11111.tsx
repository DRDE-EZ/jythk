import { getWixServerClient } from "@/lib/wix-client-server";
import { getCollections } from "@/wix-api/collections";
import Link from "next/link";
import { collections } from "@wix/stores";

export default async function RandomizedCategories({ limit = 6 }: { limit?: number }) {
  const wixClient = await getWixServerClient();
  const items = await getCollections(wixClient);
  // Shuffle
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  const selected = items.slice(0, limit);
  if (!selected.length) return null;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
  {selected.map((cat: collections.Collection) => (
        <Link key={cat._id} href={`/collections/${cat.slug}`}>
          <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer transform hover:scale-105 transition-all duration-500 bg-gradient-to-br from-primary/10 to-secondary/10 border border-border shadow-sm">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 text-foreground">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">
                {cat.name}
              </h3>
              {cat.description && (
                <p className="text-lg sm:text-xl text-muted-foreground mb-6 group-hover:text-foreground transition-colors line-clamp-2">
                  {cat.description}
                </p>
              )}
              <div className="w-16 h-16 rounded-full border-2 border-primary/60 flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}