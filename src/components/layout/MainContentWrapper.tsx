"use client";

import { usePathname } from "next/navigation";

export function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  return (
    <div className={`flex-1 flex flex-col w-full overflow-hidden pb-16 md:pb-0 transition-all duration-300 ${isHomePage ? 'md:ml-64' : 'md:ml-12'}`}>
      {children}
    </div>
  );
}
