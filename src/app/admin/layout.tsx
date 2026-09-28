import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-brand-primary">Admin Panel</h1>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">Orders</span>
            </Link>
            {/* Can add more links like Products, Users later */}
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Back to Shop</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
