"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 dark:liquid-glass flex items-center justify-center transition-all duration-300 relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 text-white dark:hidden transition-transform group-hover:rotate-45" />
      <Moon className="h-5 w-5 text-white hidden dark:block transition-transform group-hover:-rotate-12" />
      
      {/* Liquid glass reflection effect in dark mode */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hidden dark:block group-hover:animate-[shimmer_1.5s_infinite]" />
    </button>
  );
}
