import { getOrderById } from "@/actions/orders";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StatusSelect from "./StatusSelect";
import { siteConfig } from "@/config/site";
import { notFound } from "next/navigation";

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const { order, success } = await getOrderById(params.id);

  if (!success || !order) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Order #{order.orderNumber}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        
        <div>
          <StatusSelect orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
              Order Items
            </h2>
            {order.items && order.items.length > 0 ? (
              <div className="space-y-4">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{item.product?.name || 'Unknown Product'}</p>
                      <p className="text-gray-500">SKU: {item.product?.sku || 'N/A'}</p>
                      <p className="text-gray-500 mt-1">{item.quantity} x {siteConfig.currencySymbol} {item.price.toFixed(2)}</p>
                    </div>
                    <div className="font-bold text-gray-900 dark:text-gray-100">
                      {siteConfig.currencySymbol} {item.subtotal.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No items linked to this order in the database.</p>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>{siteConfig.currencySymbol} {order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping Fee</span>
                <span>{siteConfig.currencySymbol} {order.shippingFee.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{siteConfig.currencySymbol} {order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2">
                <span>Total</span>
                <span>{siteConfig.currencySymbol} {order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
              Customer Details
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Name</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{order.customerName}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Phone</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{order.phone}</p>
              </div>
              {order.whatsapp && (
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">WhatsApp</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{order.whatsapp}</p>
                </div>
              )}
              {order.email && (
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Email</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{order.email}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
              Delivery Address
            </h2>
            <div className="space-y-3 text-sm">
              <p className="text-gray-900 dark:text-gray-100">{order.address}</p>
              <p className="text-gray-900 dark:text-gray-100">{order.city}</p>
              <p className="text-gray-900 dark:text-gray-100">{order.district} District</p>
              {order.postalCode && <p className="text-gray-900 dark:text-gray-100">Postal: {order.postalCode}</p>}
              
              {order.deliveryNotes && (
                <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Notes</p>
                  <p className="italic text-gray-700 dark:text-gray-300">{order.deliveryNotes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
