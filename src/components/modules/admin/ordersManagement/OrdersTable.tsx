"use client"
import ManagementTable from "@/components/shared/ManagementTable";
import { IOrder } from "@/types/order.types";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";
import { ordersColumns } from "./OrdersColumns";

interface OrdersTableProps {
  orders: IOrder[];
}
export default function OrdersTable({orders}:OrdersTableProps) {
    const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingUser, setDeletingUser] = useState<IOrder | null>(null);
  const [viewingUser, setViewingUser] = useState<IOrder | null>(null);
  const [editingUser, setEditingUser] = useState<IOrder | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router]);

  const handleView = (user: IOrder) => {
    setViewingUser(user);
  };

  const handleEdit = (user: IOrder) => {
    setEditingUser(user);
  };
  const handleEditSuccess = useCallback(() => {
    setEditingUser(null);
    handleRefresh();
  }, [handleRefresh]);

  const handleEditClose = useCallback(() => {
    setEditingUser(null);
  }, []);
  
  // Delete
  const handleDelete = (user: IOrder) => {
    setDeletingUser(user);
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
         {/* <UserViewDetailDialog
           open={!!viewingUser}
           onClose={() => setViewingUser(null)}
           user={viewingUser}
         /> */}
   
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
  )
}
