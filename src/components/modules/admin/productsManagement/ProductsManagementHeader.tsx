"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import ProductFormDialog from "./ProductFormDialog";
// import { IBackendProduct } from "@/types/product.types";

export default function ProductsManagementHeader() {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router]);
  const handleClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);
  return (
    <>
      <ProductFormDialog
        open={isDialogOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Products Management"
        description="Manage Products information and details"
        action={{
          label: "Add Product",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
}
