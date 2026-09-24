"use client";

import { siteConfig } from "@/config/site";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 font-sans max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">Contact Us</h1>
      <p className="text-gray-500 text-center mb-12">We'd love to hear from you. Please reach out with any questions or concerns.</p>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Contact Info */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-[#f47820]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-800">Address</h3>
                  <p className="text-gray-500 text-sm mt-1">{siteConfig.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-[#f47820]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-800">Phone</h3>
                  <p className="text-gray-500 text-sm mt-1">{siteConfig.phoneNumber}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-[#f47820]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-800">Email</h3>
                  <p className="text-gray-500 text-sm mt-1">{siteConfig.email}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">First Name</label>
                  <input type="text" className="border border-gray-200 rounded p-3 focus:outline-none focus:border-[#f47820]" placeholder="John" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Last Name</label>
                  <input type="text" className="border border-gray-200 rounded p-3 focus:outline-none focus:border-[#f47820]" placeholder="Doe" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700">Email Address</label>
                <input type="email" className="border border-gray-200 rounded p-3 focus:outline-none focus:border-[#f47820]" placeholder="john@example.com" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700">Message</label>
                <textarea rows={5} className="border border-gray-200 rounded p-3 focus:outline-none focus:border-[#f47820]" placeholder="How can we help you?"></textarea>
              </div>
              <button className="bg-[#f47820] text-white font-bold py-3 rounded hover:bg-[#e96b15] transition-colors mt-2">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
