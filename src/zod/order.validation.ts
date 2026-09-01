import {
  OrderStatusZodSchema,
  PaymentStatusZodSchema,
} from "@/types/order.types";
import { z } from "zod";

export const createOrderZodSchema = z.object({
  cartItemIds: z.array(z.string()).min(1, "At least one cart item is required"),

  paymentMethod: z.enum(["COD", "ONLINE"]).optional(),
});

export const updateOrderAdminZodSchema = z.object({
  status: OrderStatusZodSchema.optional(),
  paymentStatus: PaymentStatusZodSchema.optional(),
  transactionId: z.string().optional().nullable(),
  customerName: z.string().optional(),
  phone: z.string().optional(),
  altPhone: z.string().optional().nullable(),
  address: z.string().optional(),
  city: z.string().optional(),
  thana: z.string().optional(),
  deliveryFee: z.number().nonnegative().optional(),
  totalAmount: z.number().positive().optional(),
});

export const updateOrderCustomerZodSchema = z.object({
  status: z.literal("CANCELLED").optional(),
  altPhone: z.string().optional().nullable(),
  address: z.string().optional(),
  city: z.string().optional(),
  thana: z.string().optional(),
});

// const updateOrderAdminZodSchema = z.object({
//   status: z.enum(ORDER_STATUSES).optional(),
//   paymentStatus: z.enum(PaymentStatus).optional(),
//   transactionId: z.string().optional().nullable(),
//   customerName: z.string().optional(),
//   phone: z.string().optional(),
//   altPhone: z.string().optional().nullable(),
//   address: z.string().optional(),
//   city: z.string().optional(),
//   thana: z.string().optional(),
//   deliveryFee: z.number().nonnegative().optional(),
//   totalAmount: z.number().positive().optional(),
// });

// const updateOrderCustomerBodySchema = z.object({
//   // Customers can only transition status to CANCELLED
//   status: z.enum([OrderStatus.CANCELLED]).optional(),
//   altPhone: z.string().optional().nullable(),
//   address: z.string().optional(),
//   city: z.string().optional(),
//   thana: z.string().optional(),
// });

// export const OrderValidation = {
//   createOrderZodSchema,
// };
