/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";
import z from "zod";

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: any;
} | null;

// Validates the incoming payload structure
const orderPayloadSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  phone: z.string().min(11, "Valid phone number is required"),
  altPhone: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.string().min(5, "Detailed shipping address is required"),
  city: z.string().min(2, "City is required"),
  thana: z.string().min(2, "Thana/Area is required"),
  paymentMethod: z.enum(["COD", "ONLINE"]),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().positive(),
    })
  ).min(1, "Cart cannot be empty"),
});

export async function createOrderAction(
  prevState: ActionState,
  payload: any
): Promise<ActionState> {
  
  // 1. Validate payload
  const validatedFields = orderPayloadSchema.safeParse(payload);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please check your shipping details and try again.",
      errors: validatedFields.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    // 2. Post to public Order API [cite: 148]
    const response = await axios.post(
      "http://localhost:5000/api/v1/orders",
      validatedFields.data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    return {
      success: true,
      message: response.data?.message || "Order placed successfully!",
      data: response.data?.data,
    };
  } catch (error: any) {
    console.error("Order creation failed:", error);
    const backendMessage = error.response?.data?.message || "Failed to process your order.";
    return {
      success: false,
      message: backendMessage,
    };
  }
}