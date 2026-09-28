"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(data: any) {
  try {
    const order = await prisma.order.create({
      data: {
        orderNumber: data.orderNumber,
        customerName: data.customerName,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
        address: data.address,
        city: data.city,
        district: data.district,
        postalCode: data.postalCode,
        deliveryNotes: data.deliveryNotes,
        subtotal: data.subtotal,
        shippingFee: data.shippingFee,
        discount: data.discount,
        total: data.total,
        status: "PENDING",
        // Only include items if they have valid product IDs in the DB.
        // For a robust implementation, we should check if products exist.
        // Let's assume the cart items have a valid `id` mapping to `Product.id`.
        items: {
          create: data.items.map((item: any) => ({
            product: { connect: { id: item.id } },
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity
          }))
        }
      }
    });
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, orders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, orders: [] };
  }
}

export async function getOrderById(id: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } }
    });
    return { success: true, order };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { success: false, order: null };
  }
}

export async function updateOrderStatus(id: string, status: any) {
  try {
    await prisma.order.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false };
  }
}
