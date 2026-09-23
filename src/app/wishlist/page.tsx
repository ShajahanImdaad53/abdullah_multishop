import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] font-sans text-center">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <Heart className="h-10 w-10 text-red-400" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">My Wishlist</h1>
      <p className="text-gray-500 mb-8 max-w-md">Your wishlist is currently empty. Start adding your favorite items to save them for later.</p>
      <Link href="/shop" className="bg-[#f47820] text-white font-bold py-3 px-8 rounded hover:bg-[#e96b15] transition-colors">
        START SHOPPING
      </Link>
    </div>
  );
}
