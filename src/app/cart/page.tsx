"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import { ProductImage } from "@/components/ui/ProductImage";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] font-sans text-center">
        <div className="w-24 h-24 bg-gray-50 dark:bg-[#060d1f] rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="h-12 w-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Your cart is currently empty.</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">Before proceed to checkout you must add some products to your shopping cart. You will find a lot of interesting products on our "Shop" page.</p>
        <Link href="/shop" className="bg-[#f47820] text-white font-bold py-3 px-8 rounded hover:bg-[#e96b15] transition-colors">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          {/* Desktop View */}
          <div className="hidden md:block bg-white dark:bg-[#0a192f] rounded-lg shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#060d1f] text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider border-b border-gray-200 dark:border-white/10">
                  <th className="p-4 font-semibold">Product</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold text-center">Quantity</th>
                  <th className="p-4 font-semibold text-right">Subtotal</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:bg-[#060d1f]">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 relative bg-white dark:bg-[#0a192f] border border-gray-200 dark:border-white/10 rounded p-1 shrink-0">
                          <ProductImage src={item.image} alt={item.name} fill className="object-contain" />
                        </div>
                        <Link href={`/product/${item.id}`} className="font-bold text-sm text-gray-800 dark:text-gray-100 hover:text-[#f47820]">
                          {item.name}
                        </Link>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-gray-600 dark:text-gray-300">Rs.{item.price.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center rounded overflow-hidden liquid-glass hover-lift">
                        <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-3 py-1 hover:bg-brand-orange/10 font-bold text-brand-orange">-</button>
                        <span className="px-3 font-bold text-sm w-10 text-center text-brand-orange">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-brand-orange/10 font-bold text-brand-orange">+</button>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-[#f47820] text-right">Rs.{(item.price * item.quantity).toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-2 font-bold text-xl leading-none" title="Remove">&times;</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white dark:bg-[#0a192f] p-4 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 relative bg-gray-50 dark:bg-[#060d1f] border border-gray-200 dark:border-white/10 rounded p-1 shrink-0">
                    <ProductImage src={item.image} alt={item.name} fill className="object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col min-w-0">
                    <Link href={`/product/${item.id}`} className="font-bold text-sm text-gray-800 dark:text-gray-100 hover:text-[#f47820] line-clamp-2">
                      {item.name}
                    </Link>
                    <div className="font-bold text-gray-600 dark:text-gray-300 mt-1">Rs.{item.price.toFixed(2)}</div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-1 font-bold text-2xl leading-none self-start shrink-0" title="Remove">&times;</button>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
                  <div className="inline-flex items-center rounded overflow-hidden liquid-glass hover-lift">
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-4 py-1 hover:bg-brand-orange/10 font-bold text-brand-orange">-</button>
                    <span className="px-3 font-bold text-sm w-10 text-center text-brand-orange">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-4 py-1 hover:bg-brand-orange/10 font-bold text-brand-orange">+</button>
                  </div>
                  <div className="font-bold text-[#f47820]">Rs.{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 dark:bg-[#060d1f] rounded-lg p-6 promo-border">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-white/10 pb-4">Cart totals</h2>
            
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-gray-600 dark:text-gray-300">Subtotal</span>
              <span className="font-bold text-gray-800 dark:text-gray-100">Rs.{getSubtotal().toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-300">
                Shipping
                <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">Promo</span>
              </span>
              <span className="font-bold text-green-500">FREE</span>
            </div>
            
            <div className="flex justify-between items-center mb-8 border-t border-gray-200 dark:border-white/10 pt-4">
              <span className="text-lg font-bold text-gray-800 dark:text-gray-100">Total</span>
              <span className="text-2xl font-black text-[#f47820]">Rs.{getSubtotal().toFixed(2)}</span>
            </div>
            
            <Link href="/checkout" 
              style={{ '--glass-bg': 'rgba(244, 120, 32, 0.15)' } as React.CSSProperties}
              className="block w-full liquid-glass hover-lift border-brand-orange/30 text-brand-orange hover:text-white hover:bg-brand-orange font-bold py-4 rounded text-center transition-all duration-300 tracking-wider uppercase">
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
