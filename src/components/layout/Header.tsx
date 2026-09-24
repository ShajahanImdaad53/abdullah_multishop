"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Search, ShoppingCart, Heart, User, Menu, Phone, Truck, GitCompare } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const subtotal = useCartStore((state) => state.getSubtotal());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full font-sans">
      {/* Top Bar - Orange Background */}
      <div className="bg-[#f47820] text-white">
        <div className="w-full flex flex-col md:flex-row items-center justify-between">
          
          {/* Left: Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 bg-white py-4 px-4 md:px-8 xl:px-12 h-full self-stretch justify-center w-full md:w-auto">
            <Image src="/logo.jpg" alt={siteConfig.companyName} width={180} height={70} className="object-contain mix-blend-multiply md:w-[120px] md:h-[50px] w-[180px] h-[70px]" priority />
            <span className="text-[#f47820] font-black text-3xl md:text-2xl ml-3 tracking-tight whitespace-nowrap hidden md:block">{siteConfig.companyShortName}</span>
          </Link>

          {/* Middle: Search Bar */}
          <div className="flex-1 max-w-2xl w-full px-4 py-3 pb-4 md:pb-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for products" 
                className="w-full bg-white text-gray-900 border-2 border-transparent placeholder-gray-500 rounded-full py-3 px-6 pr-12 focus:outline-none shadow-sm md:bg-transparent md:border-white/40 md:text-white md:placeholder-white/80 md:shadow-none md:py-2.5 transition-colors"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 md:text-white hover:text-gray-700 md:hover:text-gray-200">
                <Search className="h-6 w-6 md:h-5 md:w-5" />
              </button>
            </div>
          </div>

          {/* Right: Info */}
          <div className="hidden lg:flex items-center gap-8 flex-shrink-0 pr-4 md:pr-8 xl:pr-12 py-3">
            <div className="flex items-center gap-3">
              <Phone className="h-8 w-8 text-white/90" />
              <div className="flex flex-col">
                <span className="text-xs text-white/80">Hotline</span>
                <span className="font-bold text-sm">{siteConfig.phoneNumber}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-white/90" />
              <div className="flex flex-col">
                <span className="text-xs text-white/80">Island-wide</span>
                <span className="font-bold text-sm">Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Nav Bar */}
      <div className="hidden md:block bg-[#e96b15] text-white border-t border-white/10 shadow-md relative z-40">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          
          {/* Left: Nav Links */}
          <div className="flex items-center h-full">
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-2 bg-white/10 group-hover:bg-white/20 px-6 h-full font-bold text-sm tracking-wide border-r border-white/10 transition-colors">
                <Menu className="h-5 w-5" />
                ALL CATEGORIES
              </button>
              
              {/* Header Dropdown Menu */}
              <div className="absolute top-[56px] left-0 w-64 bg-white shadow-xl border-t-2 border-[#f47820] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 py-2">
                <Link href="/shop?cat=books" className="px-6 py-3 text-sm text-gray-600 hover:text-[#f47820] hover:bg-orange-50 font-medium">Books</Link>
                <Link href="/shop?cat=pens" className="px-6 py-3 text-sm text-gray-600 hover:text-[#f47820] hover:bg-orange-50 font-medium">Pens</Link>
                <Link href="/shop?cat=edu-toys" className="px-6 py-3 text-sm text-gray-600 hover:text-[#f47820] hover:bg-orange-50 font-medium">EDU Toys</Link>
                <Link href="/shop?cat=school" className="px-6 py-3 text-sm text-gray-600 hover:text-[#f47820] hover:bg-orange-50 font-medium">School Products</Link>
                <Link href="/shop" className="px-6 py-3 text-sm font-bold text-[#f47820] hover:bg-orange-50 mt-2 border-t border-gray-100">View All Categories</Link>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center h-full">
              <Link href="/" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:bg-white/10 transition-colors">HOME</Link>
              <Link href="/shop" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:bg-white/10 transition-colors">ALL PRODUCTS</Link>
              <Link href="/shop?cat=Books" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:bg-white/10 transition-colors relative">
                BOOKS <span className="absolute top-2 right-1 text-[8px] bg-red-600 px-1 rounded">NEW</span>
              </Link>
              <Link href="/shop?cat=Pens" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:bg-white/10 transition-colors relative">
                PENS <span className="absolute top-2 right-1 text-[8px] bg-red-600 px-1 rounded">NEW</span>
              </Link>
              <Link href="/shop?cat=Art" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:bg-white/10 transition-colors">ART SUPPLIES</Link>
            </nav>
          </div>

          {/* Right: Icons & Cart */}
          <div className="flex items-center gap-2 h-full">
            <Link href="/account" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/compare" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors relative">
              <GitCompare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-white text-[#f47820] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            <Link href="/wishlist" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-white text-[#f47820] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            
            <Link href="/cart" className="ml-2 bg-transparent border-2 border-white/30 hover:border-white rounded-full px-4 h-10 flex items-center gap-3 transition-colors">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {mounted && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#f47820] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="font-bold text-sm hidden sm:inline-block">
                {siteConfig.currencySymbol} {mounted ? subtotal.toFixed(2) : "0.00"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
