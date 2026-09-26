"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Search, ShoppingCart, Heart, User, Menu, Phone, Truck, GitCompare, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/shop`);
    }
  };
  const totalItems = useCartStore((state) => state.getTotalItems());
  const subtotal = useCartStore((state) => state.getSubtotal());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full font-sans">
      {/* Top Bar - Orange Background */}
      <div className="bg-[#f47820] dark:bg-[#020617] text-white transition-colors duration-300 relative">
        <div className="absolute top-2 right-4 lg:hidden z-10">
          <ThemeToggle />
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-between">
          
          {/* Left: Logo */}
          <Link href="/" className="flex flex-col md:flex-row items-center flex-shrink-0 bg-transparent py-2 md:py-0 px-4 md:px-8 xl:px-12 self-stretch justify-center w-full md:w-auto">
            <Image src="/logo.jpg" alt={siteConfig.companyName} width={500} height={200} className="object-contain mix-blend-multiply md:w-[320px] md:h-[100px] w-[240px] h-[70px]" priority />
          </Link>

          {/* Middle: Search Bar */}
          <div className="flex-1 max-w-2xl w-full px-4 py-3 pb-4 md:pb-3">
            <form onSubmit={handleSearch} className="relative flex w-full group">
              <select className="hidden md:block bg-white dark:bg-white/10 dark:text-white dark:backdrop-blur-md text-gray-700 border-2 border-r-0 border-transparent dark:border-white/20 rounded-l-full px-4 py-2.5 focus:outline-none font-medium text-sm max-w-[150px] border-r border-gray-200 dark:border-r-white/20 transition-colors">
                <option>All Categories</option>
                <option>Books</option>
                <option>Pens</option>
                <option>School Products</option>
              </select>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products" 
                className="w-full bg-white dark:bg-white/10 dark:text-white dark:placeholder-gray-300 dark:backdrop-blur-md text-gray-900 border-2 border-transparent dark:border-white/20 dark:border-l-0 placeholder-gray-500 rounded-full md:rounded-none md:rounded-r-full py-3 px-6 pr-12 focus:outline-none shadow-sm md:py-2.5 transition-colors"
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-4 text-white bg-gray-900 hover:bg-gray-800 dark:bg-white/20 dark:hover:bg-white/30 dark:backdrop-blur-md rounded-full md:rounded-none md:rounded-r-full flex items-center justify-center transition-all duration-300 border border-transparent dark:border-white/20 dark:border-l-0">
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Right: Icons & Cart */}
          <div className="hidden lg:flex items-center gap-2 pr-4 md:pr-8 xl:pr-12 py-3 h-full">
            <ThemeToggle />
            <Link href="/account" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 dark:liquid-glass flex items-center justify-center transition-all duration-300 relative overflow-hidden group">
              <HelpCircle className="h-5 w-5" />
            </Link>
            <Link href="/compare" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 dark:liquid-glass flex items-center justify-center transition-all duration-300 relative overflow-hidden group">
              <GitCompare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-white text-[#f47820] dark:bg-gray-900 dark:text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            <Link href="/wishlist" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 dark:liquid-glass flex items-center justify-center transition-all duration-300 relative overflow-hidden group">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-white text-[#f47820] dark:bg-gray-900 dark:text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            
            <Link href="/cart" className="ml-2 bg-white text-[#f47820] dark:liquid-glass dark:text-white hover:bg-gray-50 rounded-full px-4 h-10 flex items-center gap-3 transition-all duration-300 shadow-sm relative overflow-hidden group">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {mounted && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="font-bold text-sm hidden sm:inline-block text-gray-900 dark:text-white z-10">
                {siteConfig.currencySymbol} {mounted ? subtotal.toFixed(2) : "0.00"}
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hidden dark:block group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary Nav Bar */}
      <div className="hidden md:block bg-white dark:bg-[#0a192f] text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-white/10 shadow-sm relative z-40 transition-colors duration-300">
        <div className="container mx-auto px-4 flex items-center justify-between h-12">
          
          {/* Left: Nav Links */}
          <div className="flex items-center h-full">
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 px-6 h-full font-bold text-sm tracking-wide border-r border-gray-200 dark:border-white/10 transition-colors">
                <Menu className="h-5 w-5 text-[#f47820] dark:text-white" />
                ALL CATEGORIES
              </button>
              
              {/* Header Dropdown Menu */}
              <div className="absolute top-[48px] left-0 w-64 bg-white dark:bg-[#0a192f] shadow-xl border-t-2 border-[#f47820] dark:border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 py-2">
                <Link href="/shop?cat=books" className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-[#f47820] dark:hover:text-white hover:bg-orange-50 dark:hover:bg-white/5 font-medium transition-colors">Books</Link>
                <Link href="/shop?cat=pens" className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-[#f47820] dark:hover:text-white hover:bg-orange-50 dark:hover:bg-white/5 font-medium transition-colors">Pens</Link>
                <Link href="/product-category/edu-toys" className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-[#f47820] dark:hover:text-white hover:bg-orange-50 dark:hover:bg-white/5 font-medium transition-colors">EDU Toys</Link>
                <Link href="/shop?cat=school" className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-[#f47820] dark:hover:text-white hover:bg-orange-50 dark:hover:bg-white/5 font-medium transition-colors">School Products</Link>
                <Link href="/shop" className="px-6 py-3 text-sm font-bold text-[#f47820] dark:text-white hover:bg-orange-50 dark:hover:bg-white/5 mt-2 border-t border-gray-100 dark:border-white/10 transition-colors">View All Categories</Link>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center h-full">
              <Link href="/" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:text-[#f47820] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">HOME</Link>
              <Link href="/shop" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:text-[#f47820] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">ALL PRODUCTS</Link>
              <Link href="/shop?cat=Books" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:text-[#f47820] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative">
                BOOKS <span className="absolute top-2 right-1 text-[8px] bg-red-600 text-white px-1 rounded">NEW</span>
              </Link>
              <Link href="/shop?cat=Pens" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:text-[#f47820] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative">
                PENS <span className="absolute top-2 right-1 text-[8px] bg-red-600 text-white px-1 rounded">NEW</span>
              </Link>
              <Link href="/shop?cat=Art" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:text-[#f47820] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">ART SUPPLIES</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-6 h-full pr-4">
             <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-[#f47820] dark:hover:text-white cursor-pointer transition-colors">
               <Phone className="h-4 w-4 text-[#f47820] dark:text-white" />
               {siteConfig.phoneNumber}
             </div>
             <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-[#f47820] dark:hover:text-white cursor-pointer transition-colors">
               <Truck className="h-4 w-4 text-[#f47820] dark:text-white" />
               Track Order
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}
