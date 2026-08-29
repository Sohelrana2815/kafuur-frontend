"use client";

import { OrderStatusBadge } from "@/components/shared/cell/OrderStatusBadge";
import { PaymentStatusBadge } from "@/components/shared/cell/PaymentStatusBadge";
import { Column } from "@/components/shared/ManagementTable";
import { formatDate } from "@/lib/formatters";
import { IOrder } from "@/types/order.types";

export const ordersColumns: Column<IOrder>[] = [
  {
    header: "Order ID",
    accessor: (order) => (
      <span className="font-mono text-xs font-semibold uppercase">
        #{order.id.slice(-8)}
      </span>
    ),
  },

  {
    header: "Customer",
    accessor: (order) => (
      <div className="flex flex-col">
        <span className="font-medium text-sm">
          {order.customerName || order.user?.name || "N/A"}
        </span>
        <span className="text-xs text-muted-foreground">
          {order.phone || order.email || "No contact"}
        </span>
      </div>
    ),
  },

  {
    header: "Location",
    accessor: (order) => (
      <span className="text-sm">
        {order.city && order.thana
          ? `${order.thana}, ${order.city}`
          : order.city || "N/A"}
      </span>
    ),
  },

  {
    header: "Total",
    accessor: (order) => (
      <span className="font-semibold text-sm">
        ${Number(order.totalAmount || 0).toFixed(2)}
      </span>
    ),
  },

  {
    header: "Payment Method",
    accessor: (order) => (
      <span className="text-xs font-medium uppercase px-2 py-1 rounded bg-muted">
        {order.paymentMethod}
      </span>
    ),
  },

  {
    header: "Payment Status",
    accessor: (order) => <PaymentStatusBadge status={order.paymentStatus} />,
  },

  {
    header: "Order Status",
    accessor: (order) => <OrderStatusBadge status={order.status} />,
  },

  {
    header: "Placed At",
    accessor: (order) => (
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {formatDate(order.createdAt)}
      </span>
    ),
  },
];
