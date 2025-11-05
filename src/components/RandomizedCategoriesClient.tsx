"use client";

import Link from "next/link";
import { collections } from "@wix/stores";
import WixImage from "./WixImage";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RandomizedCategoriesClientProps {
  items: collections.Collection[];
  limit: number;
}

export default function RandomizedCategoriesClient({ items, limit }: RandomizedCategoriesClientProps) {
  const [selected, setSelected] = useState<collections.Collection[]>([]);

  useEffect(() => {
    // Filter out collections without names
    const validItems = items.filter(item => item.name && item.slug);
    
    // Shuffle
    const shuffled = [...validItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setSelected(shuffled.slice(0, limit));
  }, [items, limit]);

  if (!selected.length) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
      {selected.map((cat: collections.Collection, index: number) => {
        const hasImage = cat.media?.mainMedia?.image?.url;
        
        return (
          <motion.div
            key={cat._id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.05,
              y: -10,
              transition: { duration: 0.3 }
            }}
            className="group relative"
          >
            <Link href={`/collections/${cat.slug}`}>
              <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transform transition-all duration-700 bg-white border-2 border-gray-200/50 shadow-xl hover:shadow-2xl hover:border-primary/30">
                {/* Enhanced Background Image with better quality */}
                {hasImage ? (
                  <div className="absolute inset-0">
                    <WixImage
                      mediaIdentifier={cat.media?.mainMedia?.image?.url}
                      alt={cat.media?.mainMedia?.image?.altText || cat.name || "Category"}
                      width={1200} // Increased from 800 for better quality
                      height={900}  // Increased from 600 for better quality
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 filter group-hover:brightness-110 group-hover:contrast-105"
                      style={{
                        imageRendering: 'crisp-edges', // Better image rendering
                      }}
                    />
                    {/* Enhanced gradient overlay with better opacity control */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/75 group-hover:via-black/35 transition-all duration-500" />
                    
                    {/* Additional light overlay for better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-orange-600/10 group-hover:from-blue-600/20 group-hover:to-orange-600/20 transition-all duration-500" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 group-hover:from-blue-100 group-hover:to-orange-100 transition-all duration-500" />
                )}

                {/* Enhanced animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-5 -left-5 w-24 h-24 bg-primary/20 rounded-full blur-xl"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>
                
                {/* Enhanced Content Overlay with better typography */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 sm:p-8">
                  <motion.h3 
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-500 ${hasImage ? 'text-white drop-shadow-2xl' : 'text-gray-900'}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      textShadow: hasImage ? '0 4px 20px rgba(0,0,0,0.5)' : 'none',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {cat.name}
                  </motion.h3>
                  
                  {cat.description && (
                    <motion.p 
                      className={`text-lg sm:text-xl lg:text-2xl mb-6 transition-all line-clamp-2 max-w-lg leading-relaxed ${hasImage ? 'text-white/95 drop-shadow-lg' : 'text-gray-600'}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        textShadow: hasImage ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
                      }}
                    >
                      {cat.description}
                    </motion.p>
                  )}
                  
                  {/* Enhanced action button with better animations */}
                  <motion.div 
                    className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-500 backdrop-blur-md ${hasImage ? 'border-white/80 group-hover:border-white bg-white/15 group-hover:bg-white/25' : 'border-blue-600/60 group-hover:border-blue-600 bg-blue-50 group-hover:bg-blue-100'}`}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 15,
                      boxShadow: hasImage ? '0 10px 30px rgba(255,255,255,0.3)' : '0 10px 30px rgba(59, 130, 246, 0.3)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.svg 
                      className={`w-8 h-8 ${hasImage ? 'text-white' : 'text-blue-600'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </motion.div>
                </div>

                {/* Enhanced corner accent */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full group-hover:scale-150 group-hover:bg-secondary transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-secondary rounded-full group-hover:scale-150 group-hover:bg-primary transition-all duration-300"></div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}