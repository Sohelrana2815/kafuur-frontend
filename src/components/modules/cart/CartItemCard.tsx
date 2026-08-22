"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  decrementCartItem,
  deleteCartItem,
  incrementCartItem,
} from "@/services/cart/cartManagement";
import { ICartItem } from "@/types/cart.types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface ICartItemCardProps {
  cart: ICartItem;
  checked: boolean;
  onSelectionChange: (cartItemId: string, checked: boolean) => void; // (id1,true)
}

export default function CartItemCard({
  cart,
  checked,
  onSelectionChange,
}: ICartItemCardProps) {
  const router = useRouter();
  const { id, quantity, product } = cart;
  const mainImage = product?.images?.[0] || "/placeholder.svg";
  const price = Number(product?.price || 0);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleIncrementCartItem = async () => {
    await incrementCartItem(product.id);
    router.refresh();
  };
  const handleDecrementCartItem = async () => {
    await decrementCartItem(product.id);
    router.refresh();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectionChange(id, e.target.checked);
  };

  // 2. Wire up the confirmation function
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    const result = await deleteCartItem(id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Item removed from cart");
      setIsDeleteDialogOpen(false); // Close dialog on success
      router.refresh();
    } else {
      toast.error(result.message || "Failed to remove item");
    }
  };

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-4 text-card-foreground transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Product Details Section */}
        <div className="flex items-center gap-3 flex-1 min-w-0 w-full sm:w-auto">
          {/* Checkbox */}
          <Input
            onChange={handleCheckboxChange}
            type="checkbox"
            checked={checked}
            className="h-4 w-4 shrink-0 cursor-pointer"
          />
          {/* Thumbnail */}
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-muted border border-border/50 overflow-hidden shrink-0 flex items-center justify-center p-2">
            <Image
              src={mainImage}
              alt={product?.name || "Product image"}
              fill
              className="object-contain"
            />
          </div>
          {/* Title & Unit Price */}
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
              {product?.name || "Unnamed Product"}
            </h3>
            <p className="text-xs text-muted-foreground font-semibold">
              ${price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Item Controls & Pricing Section */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-border/60">
          {/* Item Total */}
          <span className="text-base font-bold text-primary shrink-0">
            ${price.toFixed(2)}
          </span>

          {/* Quantity Toggle */}
          <div className="flex items-center border border-border rounded-md overflow-hidden bg-background shrink-0">
            <button
              onClick={handleDecrementCartItem}
              disabled={quantity <= 1}
              type="button"
              className="border-none cursor-pointer"
            >
              <Minus size={16} width={24} />
            </button>
            <span className="h-7 px-3 flex items-center justify-center text-xs font-semibold border-x border-border min-w-[2rem]">
              {quantity}
            </span>
            <button
              onClick={handleIncrementCartItem}
              type="button"
              className="border-none cursor-pointer"
            >
              <Plus size={16} width={24} />
            </button>
          </div>

          {/* Actions (Delete) */}
          <div className="flex items-center gap-1 shrink-0 text-muted-foreground">
            <Button
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={checked}
              type="button"
              variant="outline"
              title="Remove Item"
              className="p-1.5 hover:text-destructive transition-colors rounded-md hover:bg-muted border-none"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      </div>
      {/* 4. Render the Dialog safely outside the main flex container */}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Remove Item from Cart"
        itemName={product?.name || "this item"}
        isDeleting={isDeleting}
      />
    </>
  );
}
