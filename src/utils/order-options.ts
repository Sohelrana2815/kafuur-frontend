import { OrderStatus, PaymentMethod, PaymentStatus } from "@/types/order.types";

export const orderStatusOptions: {
  label: string;
  value: OrderStatus;
}[] = [
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Confirmed",
    value: "CONFIRMED",
  },
  {
    label: "Processing",
    value: "PROCESSING",
  },
  {
    label: "Shipped",
    value: "SHIPPED",
  },
  {
    label: "Delivered",
    value: "DELIVERED",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
];

export const paymentMethodOptions: {
  label: string;
  value: PaymentMethod;
}[] = [
  {
    label: "Cash on Delivery",
    value: "COD",
  },
  {
    label: "Online Payment",
    value: "ONLINE",
  },
];

export const paymentStatusOptions: {
  label: string;
  value: PaymentStatus;
}[] = [
  {
    label: "Unpaid",
    value: "UNPAID",
  },
  {
    label: "Paid",
    value: "PAID",
  },
  {
    label: "Failed",
    value: "FAILED",
  },
  {
    label: "Refunded",
    value: "REFUNDED",
  },
];
