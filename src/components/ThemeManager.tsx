"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeManager() {
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const hasManualPreference =
      localStorage.getItem("theme-set-manually") === "true";
    if (hasManualPreference) return;

    const hour = new Date().getHours();
    const isDayTime = hour >= 6 && hour < 18;
    const autoTheme = isDayTime ? "light" : "dark";

    console.log("Auto Theme:", autoTheme);
    setTheme(autoTheme);
  }, [setTheme]);

  return null;
}
