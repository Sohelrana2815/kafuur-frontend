import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "@/types/order.types";

interface PaymentStatusBadgeProps {
  status?: PaymentStatus;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  switch (status) {
    case "UNPAID":
      return <Badge variant="secondary">Unpaid</Badge>;

    case "PAID":
      return <Badge>Paid</Badge>;

    case "FAILED":
      return <Badge variant="destructive">Failed</Badge>;

    case "REFUNDED":
      return <Badge variant="secondary">Refunded</Badge>;

    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}
