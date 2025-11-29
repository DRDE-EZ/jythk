"use client";

import Link from "next/link";
import Image from "next/image";

export default function LogoImage() {
  return (
    <div className="flex items-center">
      <Link href="/" className="inline-block group">
        <div className="relative flex items-center gap-3">
          <Image
            src="/partners/jyt-logo.png"
            alt="Jingyuntong Hong Kong Logo"
            width={50}
            height={50}
            className="group-hover:scale-110 transition-transform"
          />
          <div className="relative text-2xl sm:text-3xl font-bold tracking-wider">
            {/* Background building image */}
            <div className="absolute inset-0 opacity-30 overflow-hidden rounded">
              <Image
                src="/building-bg.jpg"
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Text with black color */}
            <span className="relative z-10 text-black drop-shadow-sm">
              Jingyuntong Hong Kong
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
