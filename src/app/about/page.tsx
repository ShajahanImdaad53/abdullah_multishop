import { siteConfig } from "@/config/site";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 font-sans max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">About Us</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <Image src="/logo.jpg" alt={siteConfig.companyName} width={300} height={100} className="object-contain mb-6 mix-blend-multiply" />
          <h2 className="text-2xl font-bold text-[#f47820] mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to {siteConfig.companyName}. We are dedicated to providing the best stationery, educational toys, and school supplies directly to you. Our journey began with a simple mission: to make high-quality educational materials accessible to everyone.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, we are proud to serve students, professionals, and parents across the country with a massive catalog of products designed to inspire creativity and learning.
          </p>
        </div>
        <div className="w-full md:w-1/2 aspect-square relative bg-orange-50 rounded-lg flex items-center justify-center">
          <span className="text-[#f47820] font-black text-2xl uppercase tracking-widest opacity-20 rotate-[-15deg]">
            Inspiring Creativity
          </span>
        </div>
      </div>
    </div>
  );
}
