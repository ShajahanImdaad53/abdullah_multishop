"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function createOrder(data: any) {
  try {
    const firestoreWrite = addDoc(collection(db, "orders"), {
      orderNumber: data.orderNumber,
      customerName: data.customerName,
      phone: data.phone,
      whatsapp: data.whatsapp || "",
      email: data.email || "",
      address: data.address,
      city: data.city,
      district: data.district,
      postalCode: data.postalCode || "",
      deliveryNotes: data.deliveryNotes || "",
      googleLocation: data.googleLocation || "",
      subtotal: Number(data.subtotal) || 0,
      shippingFee: Number(data.shippingFee) || 0,
      discount: Number(data.discount) || 0,
      total: Number(data.total) || 0,
      status: "PENDING",
      createdAt: data.createdAt || new Date().toISOString(),
      items: (data.items || []).map((item: any) => ({
        productId: item.productId || item.id || "",
        name: item.name || "Product",
        sku: item.sku || "N/A",
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
        subtotal: item.subtotal !== undefined ? Number(item.subtotal) : (Number(item.price) || 0) * (Number(item.quantity) || 1)
      }))
    });

    const timeoutPromise = new Promise<{ id: string }>((_, reject) =>
      setTimeout(() => reject(new Error("Firestore write timed out")), 5000)
    );

    const orderRef = await Promise.race([firestoreWrite, timeoutPromise]);
    return { success: true, orderId: orderRef.id };
  } catch (error) {
    console.error("Error creating order in Firebase:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function getOrders() {
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as any));
    return { success: true, orders };
  } catch (error) {
    console.error("Error fetching orders from Firebase:", error);
    return { success: false, orders: [] };
  }
}

export async function getOrderById(id: string) {
  try {
    const docRef = doc(db, "orders", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, order: { id: docSnap.id, ...docSnap.data() } as any };
    } else {
      return { success: false, order: null };
    }
  } catch (error) {
    console.error("Error fetching order from Firebase:", error);
    return { success: false, order: null };
  }
}

export async function updateOrderStatus(id: string, status: any) {
  try {
    const docRef = doc(db, "orders", id);
    await updateDoc(docRef, { status });
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating order status in Firebase:", error);
    return { success: false };
  }
}
