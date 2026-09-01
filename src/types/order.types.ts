import { z } from "zod";
import { IBackendProduct } from "./product.types";
import { IUser } from "./user.interface";

export const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

export const PAYMENT_STATUSES = [
  "UNPAID",
  "PAID",
  "FAILED",
  "REFUNDED",
] as const;

export const OrderStatusZodSchema = z.enum(ORDER_STATUSES);
export const PaymentStatusZodSchema = z.enum(PAYMENT_STATUSES);

export type OrderStatus = z.infer<typeof OrderStatusZodSchema>;
export type PaymentStatus = z.infer<typeof PaymentStatusZodSchema>;

export type PaymentMethod = "COD" | "ONLINE";

export interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: IBackendProduct;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: string;
  customerName: string;
  phone: string;
  altPhone?: string | null;
  email?: string | null;
  address: string;
  city: string;
  thana: string;

  // Status Fields
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  // Payment & Session Tracking
  transactionId?: string | null;
  stripeSessionId?: string | null;
  expiresAt?: string | Date | null;

  // Pricing & Relations
  deliveryFee: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;

  orderItems?: IOrderItem[];
  userId?: string | null;
  user?: IUser | null;
}

export interface IOrderSummary {
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
}

export const emptySummary: IOrderSummary = {
  itemCount: 0,
  subtotal: 0,
  shippingFee: 0,
  total: 0,
};

export interface ICreateOrderPayload {
  cartItemIds: string[];
  paymentMethod: PaymentMethod;
}

// import z from "zod";
// import { IBackendProduct } from "./product.types";
// import { IUser } from "./user.interface";

// export type OrderStatus =
//   | "PENDING"
//   | "CONFIRMED"
//   | "PROCESSING"
//   | "SHIPPED"
//   | "DELIVERED"
//   | "CANCELLED";

// export type PaymentMethod = "COD" | "ONLINE";

// export type PaymentStatus = "UNPAID" | "PAID" | "FAILED" | "REFUNDED";

// export interface IOrderItem {
//   id: string;
//   orderId: string;
//   productId: string;
//   product?: IBackendProduct;
//   quantity: number;
//   price: number;
// }

// export interface IOrder {
//   id: string;
//   customerName: string;
//   phone: string;
//   altPhone?: string | null;
//   email?: string | null;
//   address: string;
//   city: string;
//   thana: string;

//   // Status Fields
//   status: OrderStatus;
//   paymentMethod: PaymentMethod;
//   paymentStatus: PaymentStatus;

//   // Payment & Session Tracking
//   transactionId?: string | null;
//   stripeSessionId?: string | null;
//   expiresAt?: string | Date | null;

//   // Pricing & Relations
//   deliveryFee: number;
//   totalAmount: number;
//   createdAt: string 
//   updatedAt: string 
  
//   orderItems?: IOrderItem[];
//   userId?: string | null;
//   user?: IUser | null;
// }

// export interface IOrderSummary {
//   itemCount: number;
//   subtotal: number;
//   shippingFee: number;
//   total: number;
// }

// export const emptySummary: IOrderSummary = {
//   itemCount: 0,
//   subtotal: 0,
//   shippingFee: 0,
//   total: 0,
// };

// export interface ICreateOrderPayload {
//   cartItemIds: string[];
//   paymentMethod: "ONLINE" | "COD";
// }


// export const ORDER_STATUSES = [
//   "PENDING",
//   "CONFIRMED",
//   "PROCESSING",
//   "SHIPPED",
//   "DELIVERED",
//   "CANCELLED",
// ] as const;

// export const PAYMENT_STATUSES = [
//   "UNPAID",
//   "PAID",
//   "FAILED",
//   "REFUNDED",
// ] as const;

// export const OrderStatusZodSchema = z.enum(ORDER_STATUSES);
// export const PaymentStatusZodSchema = z.enum(PAYMENT_STATUSES);

// export type OrderStatus = z.infer<typeof OrderStatusZodSchema>;
// export type PaymentStatus = z.infer<typeof PaymentStatusZodSchema>;
