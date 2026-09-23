import Link from "next/link";

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] font-sans text-center">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Compare Products</h1>
      <p className="text-gray-500 mb-8 max-w-md">You haven't added any products to your comparison list yet. Browse our store to find items you want to compare.</p>
      <Link href="/shop" className="bg-[#f47820] text-white font-bold py-3 px-8 rounded hover:bg-[#e96b15] transition-colors">
        RETURN TO SHOP
      </Link>
    </div>
  );
}
