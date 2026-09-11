"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useAddToCart } from "@/hooks/useAddToCart";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
}

export default function AddToCartButton({
  productId,
  productName,
}: AddToCartButtonProps) {
  const { handleAddToCart, isAddingToCart } = useAddToCart({
    productId,
    productName,
  });

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAddingToCart}
      size="lg"
      type="button"
      className="h-12 w-full text-base font-semibold sm:h-14"
    >
      <ShoppingCart className="mr-2" size={20} />
      {isAddingToCart ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
