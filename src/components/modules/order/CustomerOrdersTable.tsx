"use client";

import OrderViewDetailDialog from "@/components/modules/admin/ordersManagement/OrderViewDetailDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { IOrder } from "@/types/order.types";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import CancelOrderDialog from "./CancelOrderDialog";
import { customerOrdersColumns } from "./CustomerOrdersColumns";
import { toast } from "sonner";
import { XCircle } from "lucide-react";

interface CustomerOrdersTableProps {
  orders: IOrder[];
}

export default function CustomerOrdersTable({
  orders,
}: CustomerOrdersTableProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [viewingOrder, setViewingOrder] = useState<IOrder | null>(null);
  const [cancellingOrder, setCancellingOrder] = useState<IOrder | null>(null);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router]);

  return (
    <>
      <ManagementTable
        data={orders}
        columns={customerOrdersColumns}
        onView={(order) => setViewingOrder(order)}
        onDelete={(order) => setCancellingOrder(order)}
        deleteLabel="Cancel"
        deleteIcon={<XCircle className="mr-2 h-4 w-4 text-destructive" />}
        canDelete={(order) => order.status === "PENDING"} // Only shows "Cancel Order" if status is PENDING
        getRowKey={(order) => order.id!}
        emptyMessage="No orders found."
      />

      {/* Reuse your existing OrderViewDetailDialog */}
      <OrderViewDetailDialog
        open={!!viewingOrder}
        onClose={() => setViewingOrder(null)}
        order={viewingOrder}
      />

      {/* Cancel Order Action Dialog */}
      {cancellingOrder && (
        <CancelOrderDialog
          open={true}
          order={cancellingOrder}
          onClose={() => setCancellingOrder(null)}
          onSuccess={handleRefresh}
        />
      )}
    </>
  );
}
