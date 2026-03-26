"use client";

import { useLanguage } from "@/i18n/context";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center bg-zinc-800/60 border border-zinc-700/50 rounded-lg p-0.5">
      <button
        onClick={() => setLocale("en")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
          locale === "en"
            ? "bg-emerald-500 text-black"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale("zh")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
          locale === "zh"
            ? "bg-emerald-500 text-black"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        中
      </button>
    </div>
  );
}
