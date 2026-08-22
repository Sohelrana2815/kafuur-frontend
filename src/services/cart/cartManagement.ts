/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import {
  IAddToCartPayload,
  IncrementCartItemPayload,
} from "@/types/cart.types";
import {
  addToCartZodSchema,
  incrementDecrementZodSchema,
} from "@/zod/cart.validation";

export const addToCart = async (productId: string) => {
  try {
    // 1. Create the Payload
    const payload: IAddToCartPayload = {
      productId,
    };

    // 2. Zod Validation
    const validatedPayload = addToCartZodSchema.safeParse(payload);

    if (!validatedPayload.success) {
      return {
        success: false,
        message: "Invalid cart data provided.",
        errors: validatedPayload.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }
    // 3. Fetch from Backend
    const res = await serverFetch.post("/cart", {
      // api/v1/cart
      body: JSON.stringify(validatedPayload.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    // 4. Handle Backend Errors
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to add cart item.",
      };
    }
    return {
      success: true,
      message: result.message || "Cart item added successfully.",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error updating cart item:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};

export async function getCarts() {
  try {
    const res = await serverFetch.get("/cart");
    const result = await res.json();

    // console.log("From Get Product Server Action:", res);
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to retrieved cart items",
      };
    }
    return {
      success: true,
      message: result.message || "Cart items retrieved successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error retrieving cart items:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
}

export const incrementCartItem = async (productId: string) => {
  try {
    // 1. Create the Payload
    const payload: IncrementCartItemPayload = {
      productId,
    };

    // 2. Zod Validation
    const validatedPayload = incrementDecrementZodSchema.safeParse(payload);

    if (!validatedPayload.success) {
      return {
        success: false,
        message: "Invalid cart data provided.",
        errors: validatedPayload.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }
    // 3. Fetch from Backend
    const res = await serverFetch.patch("/cart/increment", {
      // api/v1/cart
      body: JSON.stringify(validatedPayload.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    // 4. Handle Backend Errors
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to increment quantity.",
      };
    }
    return {
      success: true,
      message: result.message || "Increment quantity successfully.",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error Increment quantity:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};
export const decrementCartItem = async (productId: string) => {
  try {
    // 1. Create the Payload
    const payload: IncrementCartItemPayload = {
      productId,
    };

    // 2. Zod Validation
    const validatedPayload = incrementDecrementZodSchema.safeParse(payload);

    if (!validatedPayload.success) {
      return {
        success: false,
        message: "Invalid cart data provided.",
        errors: validatedPayload.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }
    // 3. Fetch from Backend
    const res = await serverFetch.patch("/cart/decrement", {
      // api/v1/cart
      body: JSON.stringify(validatedPayload.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    // 4. Handle Backend Errors
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to decrement quantity.",
      };
    }
    return {
      success: true,
      message: result.message || "Decrement quantity successfully.",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error Decrement quantity:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};

export const deleteCartItem = async (cartItemId: string) => {
  try {
    const res = await serverFetch.delete(`/cart/${cartItemId}`);
    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to delete cart item.",
      };
    }

    return {
      success: true,
      message: result.message || "Cart item deleted successfully.",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Error deleting cart item:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};
// export const updateCartItem = async (productId: string, quantity: number) => {
//   try {
//     // 1. Create the Payload
//     const payload: ICartItemPayload = {
//       productId,
//       quantity,
//     };

//     // 2. Zod Validation
//     const validatedPayload = updateCartItemZodSchema.safeParse(payload);

//     if (!validatedPayload.success) {
//       return {
//         success: false,
//         message: "Invalid cart data provided.",
//         errors: validatedPayload.error.issues.map((issue) => ({
//           field: issue.path[0],
//           message: issue.message,
//         })),
//       };
//     }
//     // 3. Fetch from Backend
//     const res = await serverFetch.post("/cart", {
//       // api/v1/cart
//       body: JSON.stringify(validatedPayload.data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const result = await res.json();
//     // 4. Handle Backend Errors
//     if (!res.ok || !result.success) {
//       return {
//         success: false,
//         message: result.message || "Failed to add cart item.",
//       };
//     }
//     return {
//       success: true,
//       message: result.message || "Cart item added successfully.",
//       data: result.data,
//     };

//   } catch (error: any) {
//     console.error("Error updating cart item:", error);
//     return {
//       success: false,
//       message: error.message || "An unexpected error occurred.",
//     };
//   }
// };
