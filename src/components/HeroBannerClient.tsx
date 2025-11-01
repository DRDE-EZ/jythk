"use client";

import { motion } from "framer-motion";
import Product from "./Product";
import React from "react";

type Product = {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
};

export default function HeroBannerClient({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-foreground">Featured Products</h3>
          <p className="text-sm text-muted-foreground">Hand-picked from our catalog</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
            <div className="flex gap-6 w-max">
              {products.map((p: Product) => (
                <div key={p._id} className="w-[320px] flex-shrink-0">
                  <Product product={p} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
