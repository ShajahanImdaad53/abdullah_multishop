"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AtlasProductCard } from "@/components/ui/AtlasProductCard";
import { Filter } from "lucide-react";

interface SubCategory {
  name: string;
  count: number;
}

interface FeaturePageProps {
  title: string;
  subCategories: SubCategory[];
  products: any[];
}

export function FeaturePage({ title, subCategories, products }: FeaturePageProps) {
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Filter Products
  const filteredProducts = useMemo(() => {
    let result = products;
    result = result.filter(p => p.price <= priceRange);
    return result;
  }, [products, priceRange, selectedColors]);

  return (
    <div className="bg-white min-h-screen">
      {/* Top Title */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight text-center mb-8">
          {title}
        </h1>

        {/* Subcategories Banner */}
        {subCategories.length > 0 && (
          <div className="bg-gray-100 rounded-xl p-6 mb-12 flex flex-wrap justify-center gap-8 items-center border border-gray-200 shadow-inner">
            {subCategories.map((sub, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow group-hover:-translate-y-1 transform duration-300">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-[#f47820] group-hover:text-white transition-colors">
                    {sub.name.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-sm text-gray-800 group-hover:text-[#f47820] transition-colors">{sub.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">{sub.count} products</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              
              {/* Filter By Price */}
              <div>
                <h3 className="font-bold text-gray-900 uppercase mb-4 text-sm tracking-wide">Filter By Price</h3>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#f47820]"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2 font-medium">
                  <span>Price: Rs.0</span>
                  <span>Rs.{priceRange}</span>
                </div>
                <button className="mt-4 bg-gray-900 hover:bg-[#f47820] text-white px-4 py-1.5 text-xs font-bold uppercase rounded transition-colors w-20">
                  Filter
                </button>
              </div>

              <hr className="border-gray-200" />

              {/* Filter By Color */}
              <div>
                <h3 className="font-bold text-gray-900 uppercase mb-4 text-sm tracking-wide">Color</h3>
                <ul className="space-y-3">
                  {['Black', 'Blue', 'Green', 'Red', 'Pink'].map((color) => (
                    <li key={color} className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        id={`color-${color}`}
                        className="w-4 h-4 rounded border-gray-300 text-[#f47820] focus:ring-[#f47820]"
                      />
                      <label htmlFor={`color-${color}`} className="text-sm text-gray-600 font-medium cursor-pointer">
                        {color}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 text-sm font-medium text-gray-500">
              <p>Showing all {filteredProducts.length} results</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <AtlasProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
                <Filter className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No products match your filters.</p>
                <button 
                  onClick={() => setPriceRange(10000)}
                  className="mt-4 text-[#f47820] hover:underline font-bold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
