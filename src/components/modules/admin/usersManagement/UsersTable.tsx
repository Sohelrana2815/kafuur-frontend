"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteProduct } from "@/services/admin/productsManagement";
import { IUser } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";
import { usersColumns } from "./UsersColumns";
import UserViewDetailDialog from "./UserViewDetailDialog";

interface UsersTableProps {
  users: IUser[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingUser, setDeletingUser] = useState<IUser | null>(null);
  const [viewingUser, setViewingUser] = useState<IUser | null>(null);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router]);

  const handleView = (user: IUser) => {
    setViewingUser(user);
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
  };
  const handleEditSuccess = useCallback(() => {
    // setEditingUser(user);
    setEditingUser(null);
    handleRefresh();
  }, [handleRefresh]);

  const handleEditClose = useCallback(() => {
    setEditingUser(null);
  }, []);
  const handleDelete = (user: IUser) => {
    setDeletingUser(user);
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;

    setIsDeleting(true);
    const result = await deleteProduct(deletingUser.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "User deleted successfully");
      setDeletingUser(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete user");
    }
  };

  return (
    <>
      <ManagementTable
        data={users}
        columns={usersColumns}
        
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(user) => user.id!}
        emptyMessage="No users found"
      />
      {/* Edit User Form Dialog */}
      {/* <UserFormDialog
        open={!!editingUser}
        onClose={handleEditClose}
        user={editingUser!}
        onSuccess={handleEditSuccess}
      /> */}

      {/* View Product Detail Dialog */}
      <UserViewDetailDialog
        open={!!viewingUser}
        onClose={() => setViewingUser(null)}
        user={viewingUser}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={confirmDelete}
        title="Delete Doctor"
        description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
}
