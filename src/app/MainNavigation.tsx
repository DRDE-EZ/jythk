"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { collections } from "@wix/stores";
import Link from "next/link";

interface MainNavigationProps {
  collections: collections.Collection[];
  className?: string;
}

export default function MainNavigation({
  collections,
  className,
}: MainNavigationProps) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <Link
            href="/shop"
            className="hover:-translate-y-1 transition-transform duration-200"
          >
            <NavigationMenuLink className="text-lg font-medium text-primary rounded-none hover:text-gray-400">
              Shop
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="group relative">
          <NavigationMenuTrigger className="flex items-center gap-1 p-5 py-[22px] text-lg font-medium rounded-none text-primary hover:text-gray-400">
            <span>Collections</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="!rounded-none border-none">
            <ul className="p-4 space-y-3">
              {collections.map((c) => (
                <li key={c._id}>
                  <Link href={`/collections/${c.slug}`} className="group">
                    <span className="absolute h-[2px] w-0  bg-primary transition-all duration-300 group-hover:w-10 transform translate-y-7" />
                    <span className="text-lg font-medium text-primary w-full justify-start whitespace-nowrap hover:text-gray-400">
                      {c.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
