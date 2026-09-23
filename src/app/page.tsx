import { HeroCarousel } from "@/components/ui/HeroCarousel";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { AtlasProductCard } from "@/components/ui/AtlasProductCard";
import { siteConfig } from "@/config/site";

const bestSellers = products.slice(0, 6);
const newProducts = products.slice(6, 10);

const popularCategories = [
  { name: "EDU Toys", image: "https://www.atlas.lk/myshop/wp-content/uploads/2020/11/Books-800x800-min-600x600.jpg", slug: "toys" },
  { name: "Book Lists", image: "https://www.atlas.lk/myshop/wp-content/uploads/2020/11/Pens-800x800-min-600x600.jpg", slug: "book-lists" },
  { name: "Books", image: "https://www.atlas.lk/myshop/wp-content/uploads/2020/11/Books-800x800-min-600x600.jpg", slug: "books" },
  { name: "Pens", image: "https://www.atlas.lk/myshop/wp-content/uploads/2020/11/Pens-800x800-min-600x600.jpg", slug: "pens" },
  { name: "Colour Products", image: "https://www.atlas.lk/myshop/wp-content/uploads/2025/09/C1-008-B-min-600x600.jpg", slug: "colour" },
  { name: "School Products", image: "https://www.atlas.lk/myshop/wp-content/uploads/2025/09/GF7001405-31-min-600x600.jpg", slug: "school" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* Hero Section (Keep existing but simplified without the side menu since we moved it globally) */}
      <section className="container mx-auto px-4 py-4 mb-4">
        <div className="flex gap-4">
          <div className="w-full h-[400px] lg:h-[450px] relative rounded-md overflow-hidden">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container mx-auto px-4 py-8 bg-white mb-8 border-y border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[28px] font-bold text-gray-800 tracking-tight">Popular Categories</h2>
          <Link href="/shop" className="bg-[#f47820] text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-[#e96b15] transition-colors flex items-center gap-1">
            ALL CATEGORIES <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularCategories.map((cat, i) => (
            <Link key={i} href={`/shop?cat=${cat.slug}`} className="group flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
              <div className="relative aspect-square p-2 flex items-center justify-center">
                <Image 
                  src={cat.image} 
                  alt={cat.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="bg-[#f0ece9] text-center py-3 border-t border-gray-200">
                <span className="font-bold text-gray-800 text-[13px]">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* The Best Sellers */}
      <section className="container mx-auto px-4 py-8 bg-[#f8f8f8] mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[28px] font-bold text-gray-800 tracking-tight">The Best Sellers</h2>
          <Link href="/shop?sort=bestsellers" className="bg-[#f47820] text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-[#e96b15] transition-colors flex items-center gap-1">
            MORE PRODUCTS <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {bestSellers.map(product => (
            <AtlasProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Products */}
      <section className="container mx-auto px-4 py-8 bg-white mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[28px] font-bold text-gray-800 tracking-tight">New Products</h2>
          <Link href="/shop?sort=newest" className="bg-[#f47820] text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-[#e96b15] transition-colors flex items-center gap-1">
            MORE PRODUCTS <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Vertical Banner */}
          <div className="w-full lg:w-[280px] flex-shrink-0 relative rounded-lg overflow-hidden h-[500px] shadow-sm group">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 z-0"></div>
             <div className="relative z-10 flex flex-col items-center pt-8 p-4 text-center">
                <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-1 rounded-full absolute top-4 right-4 uppercase">Newly Arrived</span>
                <h3 className="font-extrabold text-3xl text-blue-900 mb-2 leading-tight">Style &<br/>ZIPPY</h3>
                <p className="text-gray-600 text-sm font-medium mb-6">Unbox your lunch with PRO</p>
                <div className="relative w-48 h-64 mt-auto">
                    <Image src="/logo.jpg" alt="Zippy Bottle" fill className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform mix-blend-multiply" />
                </div>
             </div>
          </div>

          {/* Right Products */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {newProducts.map(product => (
              <AtlasProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Gift Vouchers Section */}
      <section className="w-full py-16 bg-gradient-to-r from-orange-400 via-[#f47820] to-orange-500 relative overflow-hidden">
        {/* Background Abstract Shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-[800px] h-[800px] bg-yellow-300 rounded-full blur-3xl -top-[400px] -left-[200px]"></div>
          <div className="absolute w-[600px] h-[600px] bg-red-500 rounded-full blur-3xl -bottom-[300px] -right-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Visual */}
          <div className="w-full lg:w-1/3 flex justify-center relative">
             <div className="relative w-[400px] h-[250px] bg-white rounded-xl shadow-2xl p-4 rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
               <div className="border border-dashed border-[#f47820] w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                 <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-yellow-400 rounded-full blur-xl opacity-50"></div>
                 <Image src="/logo.jpg" alt="Logo" width={80} height={30} className="mb-2 mix-blend-multiply" />
                 <h3 className="font-serif text-3xl text-gray-800 italic mb-2">Gift Voucher</h3>
                 <p className="text-xs text-gray-500">You Deserve a Gift !</p>
               </div>
             </div>
          </div>

          {/* Right Content & Cards */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight drop-shadow-sm">Gift Vouchers</h2>
            <p className="text-lg text-gray-800 font-medium mb-8">Gift your happiness with a range of stationary gift vouchers exclusively from {siteConfig.companyName}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "GENERAL GIFT VOUCHER - DIGITAL", price: "Rs.1,000.00 - Rs.10,000.00" },
                { name: "THANK YOU VOUCHER - DIGITAL", price: "Rs.1,000.00 - Rs.10,000.00" },
                { name: "GIFT VOUCHER RS 1000 - PRINTED", price: "Rs.1,000.00" },
                { name: "GIFT VOUCHER RS 5000 - PRINTED", price: "Rs.5,000.00" },
              ].map((v, i) => (
                <div key={i} className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center gap-4 hover:bg-white transition-colors cursor-pointer shadow-sm">
                  <div className="w-20 h-12 bg-gray-100 border border-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-[8px] font-bold text-[#f47820]">VOUCHER</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-[11px] uppercase mb-1 leading-tight">{v.name}</h4>
                    <p className="font-bold text-[#f47820] text-sm">{v.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
