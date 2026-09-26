import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeftFloatingNav } from "@/components/layout/LeftFloatingNav";
import { BottomNav } from "@/components/layout/BottomNav";
import { MainContentWrapper } from "@/components/layout/MainContentWrapper";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex bg-gray-50 dark:bg-[#060d1f] dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LeftFloatingNav />
          <MainContentWrapper>
            <Header />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
          </MainContentWrapper>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
