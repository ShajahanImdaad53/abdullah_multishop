"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Search, ShoppingCart, Heart, User, Menu, Phone, Truck, GitCompare, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";

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
      <div className="bg-[#f47820] text-white">
        <div className="w-full flex flex-col md:flex-row items-center justify-between">
          
          {/* Left: Logo */}
          <Link href="/" className="flex flex-col md:flex-row items-center flex-shrink-0 bg-transparent py-2 md:py-0 px-4 md:px-8 xl:px-12 self-stretch justify-center w-full md:w-auto">
            <Image src="/logo.jpg" alt={siteConfig.companyName} width={500} height={200} className="object-contain mix-blend-multiply md:w-[320px] md:h-[100px] w-[240px] h-[70px]" priority />
          </Link>

          {/* Middle: Search Bar */}
          <div className="flex-1 max-w-2xl w-full px-4 py-3 pb-4 md:pb-3">
            <form onSubmit={handleSearch} className="relative flex w-full">
              <select className="hidden md:block bg-white text-gray-700 border-2 border-r-0 border-transparent rounded-l-full px-4 py-2.5 focus:outline-none font-medium text-sm max-w-[150px] border-r border-gray-200">
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
                className="w-full bg-white text-gray-900 border-2 border-transparent placeholder-gray-500 rounded-full md:rounded-none md:rounded-r-full py-3 px-6 pr-12 focus:outline-none shadow-sm md:py-2.5 transition-colors"
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-4 text-white bg-gray-900 hover:bg-gray-800 rounded-full md:rounded-none md:rounded-r-full flex items-center justify-center transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Right: Icons & Cart */}
          <div className="hidden lg:flex items-center gap-2 pr-4 md:pr-8 xl:pr-12 py-3 h-full">
            <Link href="/account" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <HelpCircle className="h-5 w-5" />
            </Link>
            <Link href="/compare" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors relative">
              <GitCompare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-white text-[#f47820] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            <Link href="/wishlist" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-white text-[#f47820] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            
            <Link href="/cart" className="ml-2 bg-white text-[#f47820] hover:bg-gray-50 rounded-full px-4 h-10 flex items-center gap-3 transition-colors shadow-sm">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {mounted && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="font-bold text-sm hidden sm:inline-block text-gray-900">
                {siteConfig.currencySymbol} {mounted ? subtotal.toFixed(2) : "0.00"}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary Nav Bar */}
      <div className="hidden md:block bg-white text-gray-800 border-b border-gray-200 shadow-sm relative z-40">
        <div className="container mx-auto px-4 flex items-center justify-between h-12">
          
          {/* Left: Nav Links */}
          <div className="flex items-center h-full">
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-2 hover:bg-gray-50 px-6 h-full font-bold text-sm tracking-wide border-r border-gray-200 transition-colors">
                <Menu className="h-5 w-5 text-[#f47820]" />
                ALL CATEGORIES
              </button>
              
              {/* Header Dropdown Menu */}
              <div className="absolute top-[48px] left-0 w-64 bg-white shadow-xl border-t-2 border-[#f47820] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 py-2">
                <Link href="/shop?cat=books" className="px-6 py-3 text-sm text-gray-600 hover:text-[#f47820] hover:bg-orange-50 font-medium">Books</Link>
                <Link href="/shop?cat=pens" className="px-6 py-3 text-sm text-gray-600 hover:text-[#f47820] hover:bg-orange-50 font-medium">Pens</Link>
                <Link href="/product-category/edu-toys" className="px-6 py-3 text-sm text-gray-600 hover:text-[#f47820] hover:bg-orange-50 font-medium">EDU Toys</Link>
                <Link href="/shop?cat=school" className="px-6 py-3 text-sm text-gray-600 hover:text-[#f47820] hover:bg-orange-50 font-medium">School Products</Link>
                <Link href="/shop" className="px-6 py-3 text-sm font-bold text-[#f47820] hover:bg-orange-50 mt-2 border-t border-gray-100">View All Categories</Link>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center h-full">
              <Link href="/" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:text-[#f47820] hover:bg-gray-50 transition-colors">HOME</Link>
              <Link href="/shop" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:text-[#f47820] hover:bg-gray-50 transition-colors">ALL PRODUCTS</Link>
              <Link href="/shop?cat=Books" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:text-[#f47820] hover:bg-gray-50 transition-colors relative">
                BOOKS <span className="absolute top-2 right-1 text-[8px] bg-red-600 text-white px-1 rounded">NEW</span>
              </Link>
              <Link href="/shop?cat=Pens" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:text-[#f47820] hover:bg-gray-50 transition-colors relative">
                PENS <span className="absolute top-2 right-1 text-[8px] bg-red-600 text-white px-1 rounded">NEW</span>
              </Link>
              <Link href="/shop?cat=Art" className="px-5 h-full flex items-center text-sm font-bold tracking-wide hover:text-[#f47820] hover:bg-gray-50 transition-colors">ART SUPPLIES</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-6 h-full pr-4">
             <div className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#f47820] cursor-pointer">
               <Phone className="h-4 w-4 text-[#f47820]" />
               {siteConfig.phoneNumber}
             </div>
             <div className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#f47820] cursor-pointer">
               <Truck className="h-4 w-4 text-[#f47820]" />
               Track Order
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}
