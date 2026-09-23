import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full relative mt-16 font-sans">
      {/* Wave SVG top divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 -translate-y-[99%]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24 block">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#e96b15"></path>
        </svg>
      </div>

      <div className="bg-[#e96b15] text-white pt-10 pb-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-between items-start">
            
            {/* Left Col: Logo & Contact */}
            <div className="w-full lg:w-[35%] flex flex-col gap-6">
              <div className="bg-white rounded-full p-2 w-48 flex justify-center">
                <Image src="/logo.jpg" alt={siteConfig.companyName} width={140} height={50} className="object-contain mix-blend-multiply" />
              </div>
              
              <ul className="flex flex-col gap-3 text-sm font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-white" />
                  <span>Address: {siteConfig.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-white" />
                  <span>Hotline: {siteConfig.phoneNumber}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-white" />
                  <span>Email: {siteConfig.email}</span>
                </li>
              </ul>
            </div>

            {/* Middle & Right Cols */}
            <div className="w-full lg:w-[65%] grid grid-cols-2 md:grid-cols-4 gap-8">
              
              {/* About Us */}
              <div className="flex flex-col">
                <h4 className="font-bold text-lg mb-4 text-white">About Us</h4>
                <ul className="flex flex-col gap-3 text-sm">
                  <li><Link href="/about" className="hover:underline hover:text-white/80">Our Story</Link></li>
                  <li><Link href="/about" className="hover:underline hover:text-white/80">Our Purpose</Link></li>
                  <li><Link href="/about" className="hover:underline hover:text-white/80">Our Team</Link></li>
                </ul>
              </div>

              {/* Media */}
              <div className="flex flex-col">
                <h4 className="font-bold text-lg mb-4 text-white">Media</h4>
                <ul className="flex flex-col gap-3 text-sm">
                  <li><a href={siteConfig.social.facebook} className="hover:underline hover:text-white/80">Facebook</a></li>
                  <li><a href={siteConfig.social.instagram} className="hover:underline hover:text-white/80">Instagram</a></li>
                  <li><a href={siteConfig.social.youtube} className="hover:underline hover:text-white/80">YouTube</a></li>
                  <li><a href="#" className="hover:underline hover:text-white/80">LinkedIn</a></li>
                  <li><a href="#" className="hover:underline hover:text-white/80">TikTok</a></li>
                </ul>
              </div>

              {/* Policies & Notices */}
              <div className="flex flex-col">
                <h4 className="font-bold text-lg mb-4 text-white">Policies & Notices</h4>
                <ul className="flex flex-col gap-3 text-sm">
                  <li><Link href="/privacy" className="hover:underline hover:text-white/80">Privacy Notice</Link></li>
                  <li><Link href="/privacy" className="hover:underline hover:text-white/80">Cookie Notice</Link></li>
                  <li><Link href="/terms" className="hover:underline hover:text-white/80">Return Policy</Link></li>
                  <li><Link href="/terms" className="hover:underline hover:text-white/80">Terms & Conditions</Link></li>
                </ul>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col">
                <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
                <ul className="flex flex-col gap-3 text-sm">
                  <li><Link href="/cart" className="hover:underline hover:text-white/80">Cart</Link></li>
                  <li><Link href="/checkout" className="hover:underline hover:text-white/80">Checkout</Link></li>
                  <li><Link href="/account" className="hover:underline hover:text-white/80">Track Order</Link></li>
                  <li><Link href="/contact" className="hover:underline hover:text-white/80">Contact Us</Link></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-white/80">
            <p>{siteConfig.companyName}.</p>
            <div className="mt-4 md:mt-0 font-medium tracking-wide">
               SOLUTION BY <span className="font-bold text-white">Human Intelligence Solution</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
