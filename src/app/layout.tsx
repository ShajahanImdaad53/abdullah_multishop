import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeftFloatingNav } from "@/components/layout/LeftFloatingNav";
import { BottomNav } from "@/components/layout/BottomNav";
import { MainContentWrapper } from "@/components/layout/MainContentWrapper";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.companyName,
    template: `%s | ${siteConfig.companyName}`,
  },
  description: siteConfig.companyTagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex bg-gray-50`}>
        <LeftFloatingNav />
        <MainContentWrapper>
          <Header />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </MainContentWrapper>
        <BottomNav />
      </body>
    </html>
  );
}
