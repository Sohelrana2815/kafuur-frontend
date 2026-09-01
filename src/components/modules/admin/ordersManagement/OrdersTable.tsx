"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { IOrder } from "@/types/order.types";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";
import { ordersColumns } from "./OrdersColumns";
import OrderViewDetailDialog from "./OrderViewDetailDialog";

interface OrdersTableProps {
  orders: IOrder[];
}
export default function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingOrder, setDeletingOrder] = useState<IOrder | null>(null);
  const [viewingOrder, setViewingOrder] = useState<IOrder | null>(null);
  const [editingOrder, setEditingOrder] = useState<IOrder | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  // Refresh
  const handleRefresh = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router]);

  // View
  const handleView = (order: IOrder) => {
    setViewingOrder(order);
  };
  // Edit
  const handleEdit = (order: IOrder) => {
    setEditingOrder(order);
  };

  const handleEditSuccess = useCallback(() => {
    setEditingOrder(null);
    handleRefresh();
  }, [handleRefresh]);

  const handleEditClose = useCallback(() => {
    setEditingOrder(null);
  }, []);

  // Delete
  const handleDelete = (user: IOrder) => {
    setDeletingOrder(user);
  };

  //   const confirmDelete = async () => {
  //     if (!deletingUser) return;

  //     setIsDeleting(true);
  //     const result = await deleteUserById(deletingUser.id!);
  //     setIsDeleting(false);

  //     if (result.success) {
  //       toast.success(result.message || "User deleted successfully");
  //       setDeletingUser(null);
  //       handleRefresh();
  //     } else {
  //       toast.error(result.message || "Failed to delete user");
  //     }
  //   };
  return (
    <>
      <ManagementTable
        data={orders}
        columns={ordersColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(order) => order.id!}
        emptyMessage="No users found"
      />
      {/* Edit User Form Dialog */}
      {/* {editingUser && (
           <UserFormDialog
             open={true}
             onClose={handleEditClose}
             user={editingUser}
             onSuccess={handleEditSuccess}
           />
         )} */}
      {/* <UserFormDialog
           open={!!editingUser}
           onClose={handleEditClose}
           user={editingUser!}
           onSuccess={handleEditSuccess}
         /> */}

      {/* View Product Detail Dialog */}
      <OrderViewDetailDialog
        open={!!viewingOrder}
        onClose={() => setViewingOrder(null)}
        order={viewingOrder}
      />

      {/* Delete Confirmation Dialog */}
      {/* <DeleteConfirmationDialog
           open={!!deletingUser}
           onOpenChange={(open) => !open && setDeletingUser(null)}
           onConfirm={confirmDelete}
           title="Delete Doctor"
           description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
           isDeleting={isDeleting}
         /> */}
    </>
  );
}
