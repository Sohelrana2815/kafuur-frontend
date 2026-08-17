"use client";

import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { Column } from "@/components/shared/ManagementTable";
import { IBackendProduct } from "@/types/product.types";
import Image from "next/image";

export const productsColumns: Column<IBackendProduct>[] = [
  {
    header: "Image",
    accessor: (product) => {
      const firstImage = product.images?.[0];
      return (
        <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center border shrink-0">
          {firstImage ? (
            <Image
              width={48}
              height={48}
              src={firstImage}
              alt={product.name || "Product image"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[10px] text-neutral-400">No img</span>
          )}
        </div>
      );
    },
  },
  {
    header: "Product Name",
    accessor: (product) => <span className="font-medium">{product.name}</span>,
  },
  {
    header: "Short Description",
    accessor: (product) => (
      <div className="flex flex-wrap gap-1">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-foreground">
          {product.shortDescription.slice(0, 50) || "N/A"}
        </span>
      </div>
    ),
  },
  {
    header: "Price",
    accessor: (product) => (
      <span className="font-bold text-primary">${product.price || "N/A"}</span>
    ),
  },
  {
    header: "Category",
    accessor: (product) => (
      <span className="font-medium">{product.category || "N/A"}</span>
    ),
  },

  {
    header: "Is Deleted",
    accessor: (product) => <StatusBadgeCell isDeleted={product.isDeleted} />,
  },
];
