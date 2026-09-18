import { addToCart } from "@/services/cart/cartManagement";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";
import { toast } from "sonner";

interface UseAddToCartProps {
  productId: string;
  productName: string;
}

export function useAddToCart({ productId, productName }: UseAddToCartProps) {
  const updateCartCountOptimistically = useCartStore(
    (state) => state.updateCartCountOptimistically,
  );
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    if (isAddingToCart) return;

    setIsAddingToCart(true);

    // Optimistic UI increment
    updateCartCountOptimistically(1);

    try {
      const response = await addToCart(productId);

      if (!response?.success) {
        // Rollback
        updateCartCountOptimistically(-1);

        toast.error(response?.message ?? "Failed to add item to cart.");
        return;
      }

      toast.success(`${productName} added to cart!`);

      return;
    } catch {
      // Rollback
      updateCartCountOptimistically(-1);

      toast.error("An unexpected error occurred.");

      return;
    } finally {
      setIsAddingToCart(false);
    }
  };

  return {
    handleAddToCart,
    isAddingToCart,
  };
}
