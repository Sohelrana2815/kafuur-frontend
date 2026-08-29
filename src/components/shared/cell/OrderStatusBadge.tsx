import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/order.types";

interface OrderStatusBadgeProps {
  status?: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  switch (status) {
    case "PENDING":
      return <Badge variant="secondary">Pending</Badge>;

    case "CONFIRMED":
      return <Badge>Confirmed</Badge>;

    case "PROCESSING":
      return <Badge variant="secondary">Processing</Badge>;

    case "SHIPPED":
      return <Badge>Shipped</Badge>;

    case "DELIVERED":
      return <Badge>Delivered</Badge>;

    case "CANCELLED":
      return <Badge variant="destructive">Cancelled</Badge>;

    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}