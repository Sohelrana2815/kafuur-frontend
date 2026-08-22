/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

// export async function getOrderSummary(cartItemIds: string[]) {
//   try {
//     const res = await serverFetch.get(`/cart/order-summary/ids=${}`);
//     const result = await res.json();

//     // console.log("From Get Product Server Action:", res);
//     if (!res.ok || !result.success) {
//       return {
//         success: false,
//         message: result.message || "Failed to Retrieved Order Summary",
//       };
//     }
//     return {
//       success: true,
//       message: result.message || "Order Summary Retrieved successfully",
//       meta: result.meta,
//       data: result.data,
//     };
//   } catch (error: any) {
//     console.error("Error retrieving Order summary:", error);
//     return {
//       success: false,
//       message: error.message || "An unexpected error occurred.",
//     };
//   }
// }


export async function getOrderSummary(cartItemIds: string[]) {
  try {
    if (cartItemIds.length === 0) {
      return {
        success: false,
        message: "No cart items selected",
      };
    }

    const params = new URLSearchParams({
      ids: cartItemIds.join(","),
    });

    const res = await serverFetch.get(
      `/cart/order-summary?${params.toString()}`,
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message || "Failed to retrieve order summary",
      };
    }

    return {
      success: true,
      message:
        result.message ||
        "Order summary retrieved successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.error(
      "Error retrieving order summary:",
      error,
    );

    return {
      success: false,
      message:
        error.message ||
        "An unexpected error occurred.",
    };
  }
}