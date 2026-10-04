"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function createOrder(data: any) {
  // Check if Firebase environment is configured
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && !process.env.FIREBASE_PROJECT_ID) {
    console.error("[Firestore Error] Missing Firebase Project ID environment variable (NEXT_PUBLIC_FIREBASE_PROJECT_ID or FIREBASE_PROJECT_ID).");
    return {
      success: false,
      error: "Database configuration is missing. Please configure Firebase environment variables in Vercel."
    };
  }

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
      setTimeout(() => reject(new Error("Firestore write timed out after 8s")), 8000)
    );

    const orderRef = await Promise.race([firestoreWrite, timeoutPromise]);
    return { success: true, orderId: orderRef.id };
  } catch (error: any) {
    const errorCode = error?.code || "unknown";
    const errorMessage = error?.message || "Failed to create order";
    console.error(`[Firestore Order Creation Error] Code: ${errorCode}, Message: ${errorMessage}`);

    let userFriendlyError = "Failed to create order. Please try again.";
    if (errorCode === "permission-denied") {
      userFriendlyError = "Database permission denied. Please verify Firestore security rules in Firebase Console.";
    } else if (errorCode === "unavailable" || errorMessage.includes("timed out")) {
      userFriendlyError = "Database connection timed out. Please check your internet connection and try again.";
    } else if (errorCode === "unauthenticated" || errorCode === "invalid-argument") {
      userFriendlyError = "Database authentication failed. Please verify Firebase environment variables in Vercel.";
    }

    return { success: false, error: userFriendlyError };
  }
}

export async function getOrders() {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && !process.env.FIREBASE_PROJECT_ID) {
      console.warn("[Firestore] Missing Firebase Project ID environment variable.");
      return { success: false, orders: [] };
    }
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as any));
    return { success: true, orders };
  } catch (error: any) {
    console.error("[Firestore Error in getOrders]:", error?.code || error?.message || error);
    return { success: false, orders: [] };
  }
}

export async function getOrderById(id: string) {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && !process.env.FIREBASE_PROJECT_ID) {
      console.warn("[Firestore] Missing Firebase Project ID environment variable.");
      return { success: false, order: null };
    }
    const docRef = doc(db, "orders", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, order: { id: docSnap.id, ...docSnap.data() } as any };
    } else {
      return { success: false, order: null };
    }
  } catch (error: any) {
    console.error("[Firestore Error in getOrderById]:", error?.code || error?.message || error);
    return { success: false, order: null };
  }
}

export async function updateOrderStatus(id: string, status: any) {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && !process.env.FIREBASE_PROJECT_ID) {
      console.warn("[Firestore] Missing Firebase Project ID environment variable.");
      return { success: false };
    }
    const docRef = doc(db, "orders", id);
    await updateDoc(docRef, { status });
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${id}`);
    return { success: true };
  } catch (error: any) {
    console.error("[Firestore Error in updateOrderStatus]:", error?.code || error?.message || error);
    return { success: false };
  }
}
