"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ChevronRight, Heart, Share2, ShieldCheck, Truck } from "lucide-react";

import { products } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [quantity, setQuantity] = useState(1);
  const { id } = use(params);
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  // Find product
  const foundProduct = products.find(p => p.id === id);
  const product = foundProduct ? {
    ...foundProduct,
    sku: `SKU-${foundProduct.id}`,
    description: `High quality ${foundProduct.name} from ${foundProduct.brand}.`,
    inStock: true,
    images: [foundProduct.image]
  } : null;

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      sku: product.sku
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="bg-[#f0f0f0] min-h-screen py-8">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#FF6600]">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/shop" className="hover:text-[#FF6600]">Shop</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          {/* Product Images */}
          <div className="w-full md:w-1/2 p-6 flex justify-center items-center bg-white border-r border-gray-100">
            <div className="relative w-full aspect-square max-w-lg">
              <Image 
                src={product.images[0]} 
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 p-8 lg:p-10 flex flex-col bg-[#f5f5f5]">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-wide">
              {product.name}
            </h1>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3 text-sm">Key Features</h3>
              <ul className="list-disc list-inside text-gray-500 text-sm space-y-2 ml-1">
                <li>Better Writing</li>
                <li>Easy Reading</li>
                <li>Supports Learning</li>
              </ul>
            </div>

            <div className="text-sm text-gray-600 mb-4 font-medium">
              SKU: <span className="text-gray-500 font-normal">{product.sku}</span>
            </div>

            <div className="text-[28px] font-bold text-[#FF6600] mb-4">
              {siteConfig.currencySymbol}{product.price.toFixed(2)}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-800 font-medium pb-6 border-b border-gray-200 mb-6">
              <svg className="w-4 h-4 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              376 in stock
            </div>

            <div className="text-xs text-gray-500 mb-6 pb-4 border-b border-gray-200">
              or 3 X Rs.{(product.price / 3).toFixed(2)} with <span className="font-bold text-[#3B82F6]">KOKO</span> ⓘ
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center border border-gray-300 rounded-md h-10 w-28 bg-white overflow-hidden shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex-1 text-gray-600 hover:bg-gray-100 transition-colors h-full flex items-center justify-center font-medium border-r border-gray-300"
                >
                  -
                </button>
                <span className="flex-1 text-center font-medium text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex-1 text-gray-600 hover:bg-gray-100 transition-colors h-full flex items-center justify-center font-medium border-l border-gray-300"
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 w-full bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-sm py-2.5 px-4 rounded-md transition-all shadow-sm"
              >
                ADD TO CART
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="flex-1 w-full bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-sm py-2.5 px-4 rounded-md transition-all shadow-sm"
              >
                BUY NOW
              </button>
            </div>

            <div className="flex items-center gap-6 mb-8 text-sm font-medium text-gray-700">
              <button className="flex items-center gap-2 hover:text-[#FF6600] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                Add to compare
              </button>
              <button className="flex items-center gap-2 hover:text-[#FF6600] transition-colors">
                <Heart className="w-5 h-5 stroke-[1.5]" />
                Add to wishlist
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-[#eeeeee] rounded-lg p-5 border border-gray-200 mb-8">
              <div className="flex items-start gap-4">
                <Truck className="h-6 w-6 text-[#3b82f6] shrink-0" />
                <div className="flex-1">
                  <h4 className="text-gray-800 text-sm mb-2">Courier delivery</h4>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">Our courier will deliver to the specified address</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-700 font-medium mb-1">3-5 Working days</p>
                  <p className="text-xs font-bold text-gray-900">Charges may apply</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4 text-sm font-bold text-gray-800">
              Payment Methods: 
              <div className="flex items-center gap-2">
                <div className="w-10 h-6 bg-[#1a1f71] text-white flex items-center justify-center rounded text-[9px] font-bold">VISA</div>
                <div className="w-10 h-6 bg-[#222222] flex items-center justify-center rounded">
                  <div className="flex -space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[#eb001b] mix-blend-multiply"></div>
                    <div className="w-4 h-4 rounded-full bg-[#f79e1b] mix-blend-multiply"></div>
                  </div>
                </div>
                <div className="w-10 h-6 bg-[#d4e4ff] text-[#3B82F6] flex items-center justify-center rounded text-[9px] font-bold tracking-tighter">KOKO</div>
                <div className="w-10 h-6 bg-[#001b38] text-white flex items-center justify-center rounded text-[8px] font-bold">mintpay</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
