"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/actions/orders";

export default function StatusSelect({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    await updateOrderStatus(orderId, status);
    setIsUpdating(false);
    alert("Order status updated successfully!");
  };

  return (
    <div className="flex items-center gap-3">
      <select 
        value={status} 
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
      >
        <option value="PENDING">PENDING</option>
        <option value="CONFIRMED">CONFIRMED</option>
        <option value="PROCESSING">PROCESSING</option>
        <option value="PACKED">PACKED</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
      <button 
        onClick={handleUpdate} 
        disabled={isUpdating || status === currentStatus}
        className="bg-brand-primary hover:bg-brand-secondary text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
      >
        {isUpdating ? "Updating..." : "Update Status"}
      </button>
    </div>
  );
}
