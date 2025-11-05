"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const Product = dynamic(() => import("@/components/Product"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] animate-pulse">
      <Skeleton className="w-full h-[280px] rounded-lg mb-4" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
});

interface ProductClientProps {
  product: any;
}

export default function ProductClient({ product }: ProductClientProps) {
  return <Product product={product} />;
}