"use client";

import { getCarts } from "@/services/cart/cartManagement";
import { useCartStore } from "@/store/useCartStore";
import { useEffect } from "react";

export default function CartHydrator() {
  const setCartCount = useCartStore((state) => state.setCartCount);

  useEffect(() => {
    async function initCart() {
      try {
        const cartsResult = await getCarts();
        if (cartsResult?.success && cartsResult.data) {
          const totalCount = cartsResult.data.reduce(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (acc: number, item: any) => acc + item.quantity,
            0,
          );
          setCartCount(totalCount);
        }
      } catch (error) {
        console.error("Failed to hydrate cart:", error);
      }
    }
    initCart();
  }, [setCartCount]);

  return null; // This component renders nothing
}
