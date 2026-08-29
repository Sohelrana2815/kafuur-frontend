"use server";
import { serverFetch } from "@/lib/server-fetch";
import { ICreateOrderPayload } from "@/types/order.types";
import { createOrderZodSchema } from "@/zod/order.validation";

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

/* eslint-disable @typescript-eslint/no-explicit-any */


export const createOrder = async (payload: ICreateOrderPayload) => {
  try {
    // 1. Validate payload locally using Zod
    const validatedPayload = createOrderZodSchema.safeParse(payload);

    if (!validatedPayload.success) {
      return {
        success: false,
        errors: validatedPayload.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    // 2. Make authenticated API call via serverFetch with JSON headers
    const res = await serverFetch.post("/orders", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedPayload.data),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to place order.",
      };
    }

    return {
      success: true,
      message: result.message || "Order processed successfully.",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error placing order:", error);
    return {
      success: false,
      message:
        error.message ||
        "An unexpected error occurred while processing your order.",
    };
  }
};
// Get All Orders Admin
export const getAllOrders = async (queryString?: string) => {
  try {
    const url = queryString ? `/orders?${queryString}` : "/orders";
    const res = await serverFetch.get(url);

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to retrieve orders",
      };
    }

    return {
      success: true,
      message: result.message || "Orders retrieved successfully",
      data: result.data,
      meta: result.meta,
    };
  } catch (error: any) {
    console.error("Error retrieving orders:", error);

    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};

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
        message: result.message || "Failed to retrieve order summary",
      };
    }

    return {
      success: true,
      message: result.message || "Order summary retrieved successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error retrieving order summary:", error);

    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
}

export const getOrderById = async (orderId: string) => {
  try {
    const res = await serverFetch.get(`/orders/${orderId}`);

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to retrieve order details",
      };
    }

    return {
      success: true,
      message: result.message || "Order details retrieved successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error retrieving order details:", error);

    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};
