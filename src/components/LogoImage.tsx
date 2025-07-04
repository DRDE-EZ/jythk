"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import logoLight from "@/assets/mycropc-light-mode.png";
import logoDark from "@/assets/mycropc-dark-mode.png";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LogoImage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div></div>; // or return a placeholder/loading spinner

  return (
    <div className="flex items-center">
      <Link href="/" className="inline-block">
        <Image
          src={theme === "dark" ? logoDark : logoLight}
          alt="MycroPC logo"
          width={190}
          height={70}
        />
      </Link>
    </div>
  );
}
