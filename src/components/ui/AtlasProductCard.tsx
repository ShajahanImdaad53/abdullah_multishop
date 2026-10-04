"use client";

import { ProductImage } from "@/components/ui/ProductImage";
import Link from "next/link";
import { Check, Search, Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";

export function AtlasProductCard({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, quantity });
  };

  const increase = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const decrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const installmentPrice = (product.price / 3).toFixed(2);

  return (
    <div className="group bg-white dark:bg-[#020617] rounded-xl overflow-hidden border border-gray-100 dark:border-white/10 hover:border-orange-200 dark:hover:border-orange-500 hover:shadow-[0_8px_30px_rgba(244,120,32,0.12)] transition-all duration-300 flex flex-col relative w-full font-sans h-full">
      
      {/* Top Image Area */}
      <div className="relative aspect-[4/5] p-6 flex justify-center items-center bg-white dark:bg-white/5 border-b border-gray-50 dark:border-white/5 overflow-hidden">
        <Link href={`/product/${product.id}`} className="block w-full h-full relative">
          <ProductImage 
            src={product.image} 
            alt={product.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        
        {/* Free Delivery Badge */}
        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-red-500 to-[#f47820] text-white text-[9px] font-black px-2 py-1 rounded shadow-md uppercase tracking-wider promo-border animate-pulse">
          Free Delivery
        </div>
        
        {/* Hover Action Icons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
          <button className="w-8 h-8 bg-white dark:bg-[#020617] border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-brand-orange dark:hover:text-brand-orange hover:border-brand-orange dark:hover:border-brand-orange transition-colors shadow-sm">
            <Search className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-white dark:bg-[#020617] border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 hover:border-red-500 dark:hover:border-red-500 transition-colors shadow-sm">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Title */}
        <Link href={`/product/${product.id}`} className="font-bold text-gray-800 dark:text-gray-100 text-[13px] uppercase mb-1 hover:text-brand-orange dark:hover:text-brand-orange line-clamp-2 leading-tight min-h-[32px]">
          {product.name}
        </Link>
        
        {/* Categories */}
        <div className="text-[11px] text-gray-500 dark:text-gray-400 mb-2 truncate">
          {product.category}, {product.brand}
        </div>
        
        {/* In Stock */}
        <div className="flex items-center gap-1 text-[11px] text-gray-600 dark:text-gray-400 mb-2 font-medium">
          <Check className="w-3 h-3 text-brand-orange" /> In stock
        </div>
        
        {/* Price */}
        <div className="font-extrabold text-brand-orange text-lg mb-1 tracking-tight">
          Rs.{product.price.toFixed(2)}
        </div>
        
        {/* SKU */}
        <div className="text-[10px] text-gray-400 mb-3 font-medium">
          SKU: <span className="text-gray-500">{product.id.substring(0,8).toUpperCase()}</span>
        </div>
        
        {/* Installment Fake UI */}
        <div className="mt-auto border-t border-dashed border-gray-200 dark:border-gray-700 pt-3 pb-3">
          <div className="flex items-center justify-between text-[9px] text-gray-500 mb-1">
            <span>3 X Rs. {installmentPrice} with</span>
            <span className="font-black bg-black text-white px-1.5 py-0.5 rounded italic">mintpay</span>
          </div>
          <div className="flex items-center justify-between text-[9px] text-gray-500">
            <span>or 3 X Rs. {installmentPrice} with</span>
            <span className="font-black text-brand-orange tracking-tighter">KOKO</span>
          </div>
        </div>

      </div>
      
        {/* Add to Cart Area */}
        <div className="flex flex-col px-4 pb-4 gap-2 border-t border-gray-100 dark:border-gray-800 pt-3">
          <div className="flex items-center gap-2">
              <div className="flex items-center rounded h-9 w-20 shrink-0 overflow-hidden liquid-glass hover-lift">
                  <button onClick={decrease} className="flex-1 text-brand-orange hover:bg-brand-orange/10 transition-colors h-full flex items-center justify-center font-bold">-</button>
                  <div className="flex-1 text-center font-bold text-sm text-brand-orange">{quantity}</div>
                  <button onClick={increase} className="flex-1 text-brand-orange hover:bg-brand-orange/10 transition-colors h-full flex items-center justify-center font-bold">+</button>
              </div>
              <button 
                  onClick={handleAddToCart}
                  className="flex-1 liquid-glass hover-lift text-brand-orange hover:text-orange-600 hover:bg-brand-orange/10 dark:hover:bg-brand-orange/20 font-bold text-[11px] rounded h-9 transition-colors flex items-center justify-center tracking-wide"
              >
                  ADD TO CART
              </button>
          </div>
          <button 
              onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addItem({ ...product, quantity });
                  window.location.href = '/checkout';
              }}
              style={{ '--glass-bg': 'rgba(244, 120, 32, 0.15)' } as React.CSSProperties}
              className="w-full liquid-glass hover-lift border-brand-orange/30 text-brand-orange hover:text-white hover:bg-brand-orange font-bold text-[11px] rounded h-9 transition-all duration-300 flex items-center justify-center tracking-wide"
          >
              BUY NOW
          </button>
        </div>
      </div>
    );
  }
