import { HelpCircle, ShoppingCart, CreditCard, PackageCheck } from "lucide-react";

export default function OrderGuidePage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh] font-sans">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-orange-100 text-[#f47820] rounded-full flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">How to Order</h1>
          <p className="text-gray-500">A quick guide to purchasing from Abdullah Multishop.</p>
        </div>

        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-orange-50 p-3 rounded-xl shrink-0">
              <ShoppingCart className="h-6 w-6 text-[#f47820]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">1. Add to Cart</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Browse our categories and products. Click the <span className="font-semibold text-gray-800">"Add"</span> button on any item to place it in your shopping cart. You can also view product details and choose specific quantities before adding.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-orange-50 p-3 rounded-xl shrink-0">
              <CreditCard className="h-6 w-6 text-[#f47820]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">2. Buy Now & Checkout</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                If you want to instantly purchase an item, click <span className="font-semibold text-gray-800">"Buy Now"</span> to proceed directly to checkout. Alternatively, open your Cart and click <span className="font-semibold text-gray-800">"Proceed to Checkout"</span> to buy all added items.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-orange-50 p-3 rounded-xl shrink-0">
              <PackageCheck className="h-6 w-6 text-[#f47820]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">3. Complete Your Order</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Fill in your delivery and contact details on the checkout page. Once confirmed, we will process your order and arrange delivery straight to your doorstep. You can track your order using the link in the top menu.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
