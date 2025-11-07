"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { collections } from "@wix/stores";
import Link from "next/link";

interface MainNavigationProps {
  collections: collections.Collection[];
  className?: string;
}

// Fallback descriptions for collections that don't have descriptions
function getCollectionDescription(collection: collections.Collection): string {
  if (collection.description) {
    return collection.description;
  }

  // Provide fallback descriptions based on collection name/slug
  const name = collection.name?.toLowerCase() || collection.slug?.toLowerCase() || '';
  
  if (name.includes('concrete')) {
    return 'High-quality concrete mixes and sealants for all construction projects';
  }
  if (name.includes('construction') && name.includes('tools')) {
    return 'Professional construction tools and equipment for every job';
  }
  if (name.includes('forklift')) {
    return 'Industrial forklifts and replacement parts for material handling';
  }
  if (name.includes('industrial') && name.includes('equipment')) {
    return 'Heavy-duty industrial machinery and components';
  }
  if (name.includes('sustainable') || name.includes('materials')) {
    return 'Eco-friendly building materials and sustainable construction solutions';
  }
  if (name.includes('wall') && name.includes('panel')) {
    return 'Durable wall panels for interior and exterior applications';
  }
  if (name.includes('all') && name.includes('product')) {
    return 'Browse our complete range of construction materials and equipment';
  }
  
  // Generic fallback
  return `Explore our ${collection.name} collection with quality products`;
}

export default function MainNavigation({
  collections,
  className,
}: MainNavigationProps) {
  return (
    <NavigationMenu className={className} viewport={false}>
      <NavigationMenuList className="gap-3">
        <NavigationMenuItem>
          <Link href="/shop" className="text-lg font-medium text-white rounded-md px-4 py-2 hover:bg-white hover:text-[#1a4ba8] transition-all duration-200" legacyBehavior={undefined} passHref={undefined}>
            Shop
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="group relative">
          <NavigationMenuTrigger className="flex items-center gap-1 px-4 py-2 text-lg font-medium rounded-md text-white hover:bg-white hover:text-[#1a4ba8]">
            <span>Collections</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            className="!rounded-lg !p-0 !bg-white shadow-2xl border border-gray-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2"
          >
            <div className="w-[800px] max-w-[90vw] p-6">
              <div className="mb-4 pb-3 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Browse Collections</h3>
                <p className="text-sm text-gray-600 mt-1">Explore our product categories</p>
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {collections.map((c) => (
                  <Link 
                    key={c._id} 
                    href={`/collections/${c.slug}`} 
                    className="group flex items-start p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-[#1a4ba8] transition-all duration-200"
                  >
                    <div className="flex-1">
                      <span className="text-base font-semibold text-gray-900 group-hover:text-[#1a4ba8] transition-colors block mb-1">
                        {c.name}
                      </span>
                      <span className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {getCollectionDescription(c)}
                      </span>
                    </div>
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-[#1a4ba8] transition-colors ml-2 mt-0.5 flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200">
                <Link 
                  href="/shop" 
                  className="block w-full text-center py-3 px-4 text-white font-semibold rounded-lg transition-colors bg-[#1a4ba8] hover:bg-[#14396b]"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/terms" className="text-lg font-medium text-white rounded-md px-4 py-2 hover:bg-white hover:text-[#1a4ba8] transition-all duration-200" legacyBehavior={undefined} passHref={undefined}>
            Shipping
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" className="text-lg font-medium text-white rounded-md px-4 py-2 hover:bg-white hover:text-[#1a4ba8] transition-all duration-200" legacyBehavior={undefined} passHref={undefined}>
            About
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/portal" className="text-lg font-medium text-white rounded-md px-4 py-2 hover:bg-white hover:text-[#1a4ba8] transition-all duration-200" legacyBehavior={undefined} passHref={undefined}>
            Portal
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
