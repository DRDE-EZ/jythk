"use client";

import { useLanguage } from "@/i18n/context";
import Link from "next/link";
import ReloadButton from "@/components/ReloadButton";

export function ShopResultsHeader({
  q,
  totalCount,
}: {
  q?: string;
  totalCount: number;
}) {
  const { t } = useLanguage();
  const title = q ? `${t("shop", "resultsFor")} "${q}"` : t("common", "allProducts");

  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
        {title}
      </h1>

      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900 rounded-full border border-zinc-800">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <p className="text-sm sm:text-base font-medium text-zinc-400">
            <span className="font-bold text-white">{totalCount}</span>{" "}
            {totalCount === 1
              ? t("shop", "productFound")
              : t("shop", "productsFound")}{" "}
            {t("shop", "found")}
          </p>
        </div>
      </div>

      {q && (
        <p className="text-zinc-400 text-sm sm:text-base">
          {t("shop", "showingResults")}{" "}
          <span className="font-semibold text-emerald-400">
            &quot;{q}&quot;
          </span>
        </p>
      )}
    </div>
  );
}

export function ShopEmptyState({ q }: { q?: string }) {
  const { t } = useLanguage();

  return (
    <div className="text-center py-16 space-y-6">
      <div className="w-24 h-24 mx-auto bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center">
        <svg
          className="w-12 h-12 text-zinc-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-white">
          {t("shop", "noProductsFound")}
        </h3>
        <p className="text-zinc-400 max-w-md mx-auto">
          {q
            ? `${t("shop", "noProductsMatchQuery")} "${q}"${t("shop", "tryAdjusting")}`
            : t("shop", "noProductsMatchFilters")}
        </p>
      </div>
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-zinc-700 hover:border-emerald-500 text-white hover:text-emerald-400 rounded-lg font-medium transition-all duration-300"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {t("common", "resetFilters")}
      </Link>
    </div>
  );
}

export function ShopErrorState() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-8 text-center">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-red-400">
          {t("shop", "unableToLoad")}
        </h3>
        <p className="text-zinc-400 max-w-md mx-auto">
          {t("shop", "troubleConnecting")}
        </p>
      </div>
      <ReloadButton className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black rounded-lg font-medium transition-colors">
        {t("common", "tryAgain")}
      </ReloadButton>
    </div>
  );
}
