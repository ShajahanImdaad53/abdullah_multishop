"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Filter, Search, ShoppingCart } from "lucide-react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addItem = useCartStore((state) => state.addItem);
  
  // Filtering States
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [sortBy, setSortBy] = useState("newest");

  // Sync search query when URL changes
  useEffect(() => {
    const search = searchParams?.get("search");
    if (search !== null && search !== undefined) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Extract unique brands and categories
  const brands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean);
  const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      sku: product.sku || `SKU-${product.id}`
    });
    // Optional: show toast notification
  };

  const handleBuyNow = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      sku: product.sku || `SKU-${product.id}`
    });
    router.push("/checkout");
  };

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    result = result.filter(p => p.price <= priceRange);

    // Sorting
    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedBrands, selectedCategories, priceRange, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center gap-2 font-bold text-lg mb-6 text-gray-900 border-b pb-4">
              <Filter className="h-5 w-5 text-brand-secondary" /> Filters
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3 uppercase text-xs tracking-wider">Categories</h3>
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map(cat => (
                  <li key={cat}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="rounded text-brand-secondary focus:ring-brand-secondary" 
                      />
                      <span className="text-gray-600 text-sm hover:text-brand-primary">{cat}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3 uppercase text-xs tracking-wider">Brands</h3>
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map(brand => (
                  <li key={brand}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded text-brand-secondary focus:ring-brand-secondary" 
                      />
                      <span className="text-gray-600 text-sm hover:text-brand-primary">{brand}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 uppercase text-xs tracking-wider">Price up to: {siteConfig.currencySymbol} {priceRange}</h3>
              <input 
                type="range" 
                className="w-full accent-brand-secondary" 
                min="0" 
                max="5000" 
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Rs. 0</span>
                <span>Rs. 5000+</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Products <span className="text-gray-400 text-lg font-normal">({filteredProducts.length})</span>
            </h1>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-secondary text-sm"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary shrink-0"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
              <p className="text-gray-500 mb-4">No products found matching your filters.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedBrands([]);
                  setSelectedCategories([]);
                  setPriceRange(5000);
                }}
                className="text-brand-secondary font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-lg transition-all hover-lift">
                  <Link href={`/product/${product.id}`} className="block relative aspect-square bg-gray-50 overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-xs text-brand-secondary font-medium mb-1">{product.brand}</span>
                    <Link href={`/product/${product.id}`} className="font-medium text-gray-900 mb-2 hover:text-brand-secondary line-clamp-2" title={product.name}>
                      {product.name}
                    </Link>
                    <div className="mt-auto pt-2 flex items-center justify-between mb-4">
                      <span className="font-bold text-lg text-brand-primary">{siteConfig.currencySymbol} {product.price.toFixed(2)}</span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => handleAddToCart(product, e)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-1"
                      >
                        <ShoppingCart className="h-4 w-4" /> Add
                      </button>
                      <button 
                        onClick={(e) => handleBuyNow(product, e)}
                        className="flex-1 bg-brand-primary hover:bg-brand-secondary text-white font-medium py-2 rounded-lg transition-colors text-sm"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
