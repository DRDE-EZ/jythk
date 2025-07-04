"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import logoLight from "@/assets/mycropc-light-mode.png";
import logoDark from "@/assets/mycropc-dark-mode.png";
import Image from "next/image";

export default function LogoImage() {
  const { theme } = useTheme();

  return (
    <div className="flex items-center">
      <Link href="/" className="inline-block">
        <Image
          src={theme === "dark" ? logoLight : logoDark}
          alt="MycroPC logo"
          width={190}
          height={70}
        />
      </Link>
    </div>
  );
}
