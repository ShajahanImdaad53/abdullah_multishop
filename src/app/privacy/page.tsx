import { siteConfig } from "@/config/site";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 font-sans max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Privacy Policy</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="prose max-w-none text-gray-600">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">Welcome to {siteConfig.companyName}. We respect your privacy and are committed to protecting your personal data.</p>
          
          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. The Data We Collect About You</h2>
          <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. How We Use Your Personal Data</h2>
          <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. Contact Details</h2>
          <p className="mb-4">If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
          <p className="font-medium text-gray-800">{siteConfig.email}</p>
        </div>
      </div>
    </div>
  );
}
