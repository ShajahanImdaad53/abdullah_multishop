"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const clearCart = useCartStore((state) => state.clearCart);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    deliveryNotes: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const shippingFee = 350;
  const discount = 0;
  const grandTotal = subtotal + shippingFee - discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form (basic)
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.district) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderNumber = `ORD-${new Date().toISOString().slice(0,10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    let message = `Hello ${siteConfig.companyName},\n\nI would like to place an order.\n\n`;
    message += `Order No: ${orderNumber}\n\nProducts:\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\nSKU: ${item.sku}\nQty: ${item.quantity}\nUnit Price: ${siteConfig.currencySymbol} ${item.price.toFixed(2)}\nSubtotal: ${siteConfig.currencySymbol} ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `Delivery Address:\n${formData.address}\n\nCity: ${formData.city}\nDistrict: ${formData.district}\n\n`;
    if (formData.deliveryNotes) {
      message += `Notes: ${formData.deliveryNotes}\n\n`;
    }

    message += `Subtotal: ${siteConfig.currencySymbol} ${subtotal.toFixed(2)}\n`;
    message += `Shipping Fee: ${siteConfig.currencySymbol} ${shippingFee.toFixed(2)}\n`;
    message += `Total: ${siteConfig.currencySymbol} ${grandTotal.toFixed(2)}\n\n`;
    message += `Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart(); // Empty the cart after ordering
  };

  if (!mounted) return null; // Hydration fix

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Add some products to your cart before checking out.</p>
        <Link href="/shop" className="bg-brand-primary text-white font-medium py-3 px-6 rounded-full hover:bg-brand-secondary transition-colors">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">Delivery Details</h2>
            
            <form onSubmit={handleWhatsAppOrder} id="checkout-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="077 123 4567" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number (Optional)</label>
                  <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="077 123 4567" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                <input required name="address" value={formData.address} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="No 123, Galle Road" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="Colombo 03" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                  <select required name="district" value={formData.district} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all bg-white">
                    <option value="">Select District</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kalutara">Kalutara</option>
                    <option value="Kandy">Kandy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  <input name="postalCode" value={formData.postalCode} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="00300" />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Notes (Optional)</label>
                <textarea name="deliveryNotes" value={formData.deliveryNotes} onChange={handleChange} rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="E.g. Please call before delivery"></textarea>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-1 sm:pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 relative bg-gray-50 rounded-md border border-gray-200 overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 break-words leading-tight">{item.name}</h4>
                      <div className="flex items-center justify-between mt-1 sm:hidden">
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <div className="font-bold text-sm text-brand-primary">
                          {siteConfig.currencySymbol} {(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                      <p className="hidden sm:block text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="hidden sm:block font-semibold text-sm shrink-0 whitespace-nowrap text-right mt-0.5 sm:mt-0">
                      {siteConfig.currencySymbol} {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4 mb-6 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{siteConfig.currencySymbol} {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span>{siteConfig.currencySymbol} {shippingFee.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{siteConfig.currencySymbol} {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>{siteConfig.currencySymbol} {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-4 rounded-xl transition-colors hover-lift flex items-center justify-center gap-2 mb-4"
              >
                Order via WhatsApp
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                Secure Checkout Process
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
