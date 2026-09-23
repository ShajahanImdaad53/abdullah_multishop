import { siteConfig } from "@/config/site";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 font-sans max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Terms & Conditions</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="prose max-w-none text-gray-600">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and {siteConfig.companyName} ("Company," "we," "us," or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").</p>
          
          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. Products and Services</h2>
          <p className="mb-4">All products and services are subject to availability. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.</p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. Purchases and Payment</h2>
          <p className="mb-4">We accept the following forms of payment:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Visa</li>
            <li>Mastercard</li>
            <li>Koko</li>
            <li>Mintpay</li>
          </ul>
          <p className="mb-4">You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.</p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. Return Policy</h2>
          <p className="mb-4">Please review our Return Policy posted on the Site prior to making any purchases. All returns must be postmarked within 14 days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.</p>
        </div>
      </div>
    </div>
  );
}
