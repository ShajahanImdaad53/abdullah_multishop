"use client";

import { Menu, Book, PenTool, Scissors, Calculator, Briefcase, Paperclip, Monitor, Headphones, Backpack, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MegaMenu } from "./MegaMenu";

const navItems = [
  { icon: BookOpen, name: "Book Lists", slug: "/shop?cat=book-lists" },
  { icon: Book, name: "Books", slug: "/shop?cat=books" },
  { icon: PenTool, name: "Pens", slug: "/shop?cat=pens" },
  { icon: Scissors, name: "Colour Products", slug: "/shop?cat=colour" },
  { icon: Briefcase, name: "School Products", slug: "/shop?cat=school" },
  { icon: Paperclip, name: "Office Products", slug: "/shop?cat=office" },
  { icon: Monitor, name: "Bottle and Boxes", slug: "/shop?cat=bottles" },
  { icon: PenTool, name: "Highlighters and Markers", slug: "/shop?cat=highlighters" },
  { icon: Book, name: "Paper Products", slug: "/shop?cat=paper" },
  { icon: Calculator, name: "EDU Toys", slug: "/product-category/edu-toys", hasSub: true },
  { icon: Headphones, name: "Innovate", slug: "/brand/innovate" },
  { icon: Backpack, name: "School Bags", slug: "/shop?cat=bags", hasSub: true },
  { icon: BookOpen, name: "Homerun", slug: "/shop?cat=homerun" },
];

export function LeftFloatingNav() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [activeHover, setActiveHover] = useState<string | null>(null);

  // Only render category sidebar on the homepage
  if (!isHomePage) return null;

  return (
    <div 
      className="w-64 bg-white dark:bg-[#0a192f] border-r border-gray-200 dark:border-white/10 flex flex-col shadow-sm hidden md:flex shrink-0 relative z-30"
      onMouseLeave={() => setActiveHover(null)}
    >
      {/* Top Orange Menu Header */}
      <div className="w-full h-12 bg-[#f47820] dark:bg-black flex items-center px-4 justify-start text-white">
        <Menu className="h-6 w-6 flex-shrink-0" />
        <span className="ml-3 font-bold text-sm tracking-wide whitespace-nowrap">All Categories</span>
      </div>

      {/* Nav Icons & Text */}
      <div className="flex flex-col gap-1 mt-2 w-full overflow-y-auto overflow-x-hidden no-scrollbar pb-4 relative">
        {navItems.map((item, i) => (
          <div 
            key={i} 
            className="w-full"
            onMouseEnter={() => setActiveHover(item.slug)}
          >
            <Link 
              href={item.slug} 
              className="h-10 flex items-center text-gray-800 dark:text-gray-200 hover:text-[#f47820] dark:hover:text-[#f47820] transition-all duration-300 relative overflow-hidden group liquid-glass px-4 rounded-lg mx-2"
            >
              <item.icon className="h-4 w-4 flex-shrink-0 relative z-10" />
              <span className="ml-3 text-[13px] font-bold tracking-tight whitespace-nowrap relative z-10">{item.name}</span>
              {item.hasSub && <ChevronRight className="h-4 w-4 ml-auto text-gray-400 relative z-10" />}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent hidden group-hover:block group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>
          </div>
        ))}
      </div>

      {/* Mega Menu Flyout connected to the expanded state */}
      {activeHover && (
        <div className="absolute left-[256px] top-12 bottom-0 w-[600px] z-50">
          <MegaMenu activeCategory={activeHover} />
        </div>
      )}
    </div>
  );
}
