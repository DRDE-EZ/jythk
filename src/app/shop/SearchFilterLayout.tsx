"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductsSort } from "@/wix-api/products";
import { collections } from "@wix/stores";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useOptimistic, useState, useTransition } from "react";

interface SearchFilterLayoutProps {
  collections: collections.Collection[];
  children: React.ReactNode;
}

export default function SearchFilterLayout({
  collections,
  children,
}: SearchFilterLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [optimisticFilters, setOptimisticFilters] = useOptimistic({
    collection: searchParams.getAll("collection"),
    price_min: searchParams.get("price_min") || undefined,
    price_max: searchParams.get("price_max") || undefined,
    sort: searchParams.get("sort") || undefined,
  });

  const [isPending, startTransition] = useTransition();

  function updateFilters(updates: Partial<typeof optimisticFilters>) {
    const newState = { ...optimisticFilters, ...updates };
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(newState).forEach(([key, value]) => {
      newSearchParams.delete(key);

      if (Array.isArray(value)) {
        value.forEach((v) => newSearchParams.append(key, v));
      } else if (value) {
        newSearchParams.set(key, value);
      }
    });

    newSearchParams.delete("page");

    startTransition(() => {
      setOptimisticFilters(newState);
      router.push(`?${newSearchParams.toString()}`);
    });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-muted/30 via-muted/20 to-background py-12 sm:py-16 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Shop
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of high-performance systems
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Enhanced Sidebar - Narrower */}
          <aside
            className="lg:w-72 lg:sticky lg:top-8 lg:self-start lg:flex-shrink-0"
            data-pending={isPending ? "" : undefined}
          >
            <div className="bg-card border border-border rounded-2xl p-4 lg:p-6 space-y-6 lg:space-y-8 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg lg:text-xl font-bold text-card-foreground">
                  Filters
                </h2>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                    />
                  </svg>
                </div>
              </div>

              <CollectionsFilter
                collections={collections}
                selectedCollectionIds={optimisticFilters.collection}
                updateCollectionIds={(collectionIds) =>
                  updateFilters({ collection: collectionIds })
                }
              />

              <div className="border-t border-border pt-4 lg:pt-6">
                <PriceFilter
                  minDefaultInput={optimisticFilters.price_min}
                  maxDefaultInput={optimisticFilters.price_max}
                  updatePriceRange={(price_min, price_max) =>
                    updateFilters({
                      price_min,
                      price_max,
                    })
                  }
                />
              </div>
            </div>
          </aside>

          {/* Products Section - Wider */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Sort Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-card border border-border rounded-xl">
              <div className="text-sm text-muted-foreground">
                Browse our premium collection
              </div>
              <SortFilter
                sort={optimisticFilters.sort}
                updateSort={(sort) => updateFilters({ sort })}
              />
            </div>

            {/* Products Content */}
            <div className="group">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface CollectionsFilterProps {
  collections: collections.Collection[];
  selectedCollectionIds: string[];
  updateCollectionIds: (collectionIds: string[]) => void;
}

function CollectionsFilter({
  collections,
  selectedCollectionIds,
  updateCollectionIds,
}: CollectionsFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <h3 className="font-semibold text-card-foreground">Collections</h3>
      </div>
      <ul className="space-y-3">
        {collections.map((collection) => {
          const collectionId = collection._id;
          if (!collectionId) return null;
          return (
            <li key={collectionId}>
              <label className="flex cursor-pointer items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group">
                <Checkbox
                  className="rounded-md border-2"
                  id={collectionId}
                  checked={selectedCollectionIds.includes(collectionId)}
                  onCheckedChange={(checked) => {
                    updateCollectionIds(
                      checked
                        ? [...selectedCollectionIds, collectionId]
                        : selectedCollectionIds.filter(
                            (id) => id !== collectionId
                          )
                    );
                  }}
                />
                <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {collection.name}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      {selectedCollectionIds.length > 0 && (
        <button
          onClick={() => updateCollectionIds([])}
          className="text-primary text-sm hover:underline font-medium px-2 py-1 rounded hover:bg-primary/10 transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

interface PriceFilterProps {
  minDefaultInput: string | undefined;
  maxDefaultInput: string | undefined;
  updatePriceRange: (min: string | undefined, max: string | undefined) => void;
}

function PriceFilter({
  minDefaultInput,
  maxDefaultInput,
  updatePriceRange,
}: PriceFilterProps) {
  const [minInput, setMinInput] = useState(minDefaultInput ?? "");
  const [maxInput, setMaxInput] = useState(maxDefaultInput ?? "");

  useEffect(() => {
    setMinInput(minDefaultInput || "");
    setMaxInput(maxDefaultInput || "");
  }, [minDefaultInput, maxDefaultInput]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    updatePriceRange(minInput, maxInput);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-secondary"></div>
        <h3 className="font-semibold text-card-foreground">Price Range</h3>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Min
            </label>
            <Input
              type="number"
              name="min"
              placeholder="0"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
              className="rounded-lg border-2 focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Max
            </label>
            <Input
              type="number"
              name="max"
              placeholder="∞"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
              className="rounded-lg border-2 focus:border-primary"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full rounded-lg font-semibold"
          size="sm"
        >
          Apply Filter
        </Button>
      </form>
      {(!!minDefaultInput || !!maxDefaultInput) && (
        <button
          onClick={() => updatePriceRange(undefined, undefined)}
          className="text-primary text-sm hover:underline font-medium px-2 py-1 rounded hover:bg-primary/10 transition-colors"
        >
          Clear price filter
        </button>
      )}
    </div>
  );
}

interface SortFilterProps {
  sort: string | undefined;
  updateSort: (value: ProductsSort) => void;
}

function SortFilter({ sort, updateSort }: SortFilterProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground hidden sm:block">
        Sort by:
      </span>
      <Select value={sort || "last_updated"} onValueChange={updateSort}>
        <SelectTrigger className="w-48 rounded-lg border-2 focus:border-primary bg-background">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-lg border-2">
          <SelectItem value="last_updated" className="rounded-md">
            Newest First
          </SelectItem>
          <SelectItem value="price_asc" className="rounded-md">
            Price: Low to High
          </SelectItem>
          <SelectItem value="price_desc" className="rounded-md">
            Price: High to Low
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
