"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ProductFormDialog from "./ProductFormDialog";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { IBackendProduct } from "@/types/product.types";






interface ProductsManagementHeaderProps {
    product: IBackendProduct;
}

export default function ProductsManagementHeader({
  product,
}: ProductsManagementHeaderProps) {
     const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      <ProductFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
        product={product}
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
  )
}
