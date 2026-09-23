"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

// Define the subcategories mapping
const subcategoryMap: Record<string, string[]> = {
  "edu-toys": [
    "BlockBuddies",
    "CraftBuddies",
    "MindBuddies",
    "SmartyPops",
    "Activity Kit"
  ],
  "bags": [
    "School Bags",
    "Lunch Bags",
    "Pencil Cases"
  ]
};

export function MegaMenu({ activeCategory }: { activeCategory: string }) {
  // Only render if the category has subcategories defined
  const subcategories = subcategoryMap[activeCategory];
  
  if (!subcategories) return null;

  // Fetch recent products matching any of these subcategories/brands
  const recentProducts = products
    .filter(p => subcategories.includes(p.brand || '') || subcategories.includes(p.category || ''))
    .slice(0, 4);

  // If no products matched, just show some default ones for the demo
  const displayProducts = recentProducts.length > 0 ? recentProducts : products.slice(10, 14);

  return (
    <div className="w-full h-full bg-white shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)] border-l border-gray-100 flex p-6 gap-8 animate-in slide-in-from-left-2 duration-200">
      
      {/* Column 1: Subcategories */}
      <div className="w-1/3 flex flex-col">
        <h3 className="text-[11px] font-bold text-gray-800 uppercase tracking-widest mb-6">Categories</h3>
        <ul className="flex flex-col gap-4">
          {subcategories.map((sub, i) => (
            <li key={i}>
              <Link 
                href={`/shop?cat=${activeCategory}&sub=${sub.toLowerCase().replace(' ', '-')}`}
                className="text-[13px] text-gray-500 hover:text-[#f47820] transition-colors font-medium"
              >
                {sub}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 2: Recent Products */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-[11px] font-bold text-gray-800 uppercase tracking-widest mb-6">Recent Products</h3>
        <div className="flex flex-col gap-4">
          {displayProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              className="flex items-center gap-4 group"
            >
              <div className="w-16 h-16 bg-white border border-gray-100 rounded flex items-center justify-center p-1 shrink-0 group-hover:border-[#f47820] transition-colors">
                <div className="relative w-full h-full">
                  <Image 
                    src={product.image || '/logo.jpg'} 
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-800 uppercase group-hover:text-[#f47820] transition-colors line-clamp-2 leading-tight mb-1">
                  {product.name}
                </span>
                <span className="text-xs font-bold text-[#f47820]">
                  Rs.{product.price.toFixed(2)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
    </div>
  );
}
