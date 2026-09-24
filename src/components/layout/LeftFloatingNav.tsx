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
  const [isHovered, setIsHovered] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const isExpanded = isHomePage || isHovered;

  // Helper to ensure hover logic only triggers on desktop
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveHover(null);
  };

  return (
    <div 
      className={`fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 z-50 flex flex-col shadow-2xl transition-all duration-300 ${isExpanded ? 'w-64' : 'w-12'} hidden md:flex`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Orange Menu Button */}
      <button className={`w-full h-12 bg-[#f47820] flex items-center hover:bg-[#e96b15] transition-colors text-white ${isExpanded ? 'px-4 justify-start' : 'justify-center'}`}>
        <Menu className="h-6 w-6 flex-shrink-0" />
        {isExpanded && <span className="ml-3 font-bold text-sm tracking-wide whitespace-nowrap">All Categories</span>}
      </button>

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
              className={`h-10 flex items-center text-gray-500 hover:text-[#f47820] transition-colors ${isExpanded ? 'px-4 hover:bg-orange-50' : 'justify-center mx-auto w-8 rounded-full hover:bg-orange-50'}`}
              title={!isExpanded ? item.name : undefined}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {isExpanded && (
                <>
                  <span className="ml-3 text-[13px] font-bold tracking-tight whitespace-nowrap">{item.name}</span>
                  {item.hasSub && <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />}
                </>
              )}
            </Link>
          </div>
        ))}
      </div>

      {/* Mega Menu Flyout connected to the expanded state */}
      {isExpanded && activeHover && (
        <div className="absolute left-[256px] top-12 bottom-0 w-[600px]">
          <MegaMenu activeCategory={activeHover} />
        </div>
      )}
    </div>
  );
}

// Just a small helper to avoid hydration mismatch if needed, though regular useState is fine here
function setIsExpandedState(initial: boolean) {
  return useState(initial);
}
