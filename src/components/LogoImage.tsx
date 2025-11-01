"use client";

import Link from "next/link";

export default function LogoImage() {
  return (
    <div className="flex items-center">
      <Link href="/" className="inline-block group">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow" style={{ color: '#1a4ba8' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-white leading-none tracking-tight">Formex</div>
              <div className="text-xs text-blue-100 leading-tight">Construction & Wholesale</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
