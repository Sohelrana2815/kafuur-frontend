/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

// export async function getMyOrders(queryString?: string) {
//   const res = await serverFetch.get(
//     `/orders/my-orders${queryString ? `?${queryString}` : ""}`,
//   );
//   return res.json();
// }
export async function getMyOrders() {
  const res = await serverFetch.get("/orders/my-orders");
  return res.json();
}

export async function getMyOrderById(orderId: string) {
  const res = await serverFetch.get(`/orders/${orderId}`);
  return res.json();
}

export async function cancelMyOrder(orderId: string, prevState: any) {
  try {
    const res = await serverFetch.patch(`/orders/cancel/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "CANCELLED" }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to cancel order.",
      };
    }

    revalidatePath("/customer/orders");
    return {
      success: true,
      message: "Order cancelled successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
}
