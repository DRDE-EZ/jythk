"use client";

import Link from "next/link";
import Image from "next/image";

export default function LogoImage() {
  return (
    <div className="flex items-center">
      <Link href="/" className="inline-block group">
        <div className="flex items-center gap-3">
          <Image
            src="/partners/jyt-logo.png"
            alt="JYT Corp Logo"
            width={50}
            height={50}
            className="group-hover:scale-110 transition-transform"
          />
          <div className="text-3xl font-bold text-white tracking-wider group-hover:text-emerald-400 transition-colors">
            JYT HK
          </div>
        </div>
      </Link>
    </div>
  );
}
