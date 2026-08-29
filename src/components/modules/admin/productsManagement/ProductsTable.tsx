"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { IBackendProduct } from "@/types/product.types";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import ProductFormDialog from "./ProductFormDialog";
import { productsColumns } from "./ProductsColumns";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { deleteProduct } from "@/services/admin/productsManagement";
import { toast } from "sonner";
import ProductViewDetailDialog from "./ProductViewDetailDialog";

interface ProductsTableProps {
  products: IBackendProduct[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingProduct, setDeletingProduct] =
    useState<IBackendProduct | null>(null);
  const [viewingProduct, setViewingProduct] = useState<IBackendProduct | null>(
    null,
  );
  const [editingProduct, setEditingProduct] = useState<IBackendProduct | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router]);

  const handleView = (product: IBackendProduct) => {
    setViewingProduct(product);
  };

  const handleEdit = (product: IBackendProduct) => {
    setEditingProduct(product);
  };
  const handleEditSuccess = useCallback(() => {
    // setEditingProduct(product);
    setEditingProduct(null);
    handleRefresh();
  }, [handleRefresh]);

  const handleEditClose = useCallback(() => {
    setEditingProduct(null);
  }, []);
  const handleDelete = (product: IBackendProduct) => {
    setDeletingProduct(product);
  };

  const confirmDelete = async () => {
    if (!deletingProduct) return;

    setIsDeleting(true);
    const result = await deleteProduct(deletingProduct.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Product deleted successfully");
      setDeletingProduct(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete product");
    }
  };

  return (
    <>
      <ManagementTable
        data={products}
        columns={productsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(product) => product.id!}
        emptyMessage="No products found"
      />
      {/* Edit Product Form Dialog */}
      <ProductFormDialog
        open={!!editingProduct}
        onClose={handleEditClose}
        product={editingProduct!}
        onSuccess={handleEditSuccess}
      />

      {/* View Product Detail Dialog */}
      <ProductViewDetailDialog
        open={!!viewingProduct}
        onClose={() => setViewingProduct(null)}
        product={viewingProduct}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingProduct}
        onOpenChange={(open) => !open && setDeletingProduct(null)}
        onConfirm={confirmDelete}
        title="Delete Doctor"
        description={`Are you sure you want to delete ${deletingProduct?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
}
