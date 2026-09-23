export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] font-sans">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-orange-100 text-[#f47820] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">My Account</h1>
        <p className="text-gray-500 mb-8">Sign in to view your orders, update your details, and manage your wishlist.</p>
        <button className="w-full bg-[#f47820] text-white font-bold py-3 rounded hover:bg-[#e96b15] transition-colors">
          SIGN IN / REGISTER
        </button>
      </div>
    </div>
  );
}
