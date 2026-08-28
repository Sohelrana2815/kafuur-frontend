"use client";

import { ICartItem } from "@/types/cart.types";
import { useMemo, useState } from "react";
import OrderSummary from "../../shared/OrderSummary";
import CartItemCard from "./CartItemCard";

interface ICartContainerProps {
  data: ICartItem[];
}


export default function CartContainer({ data }: ICartContainerProps) {
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<string[]>([]);

  const handleSelectionChange = (cartItemId: string, isChecked: boolean) => {
    setSelectedCartItemIds((prevIds) => {
      if (isChecked) {
        return prevIds.includes(cartItemId)
          ? prevIds
          : [...prevIds, cartItemId];
      }
      return prevIds.filter((id) => id !== cartItemId);
    });
  };

  const orderSummary = useMemo(() => {
    const selectedItems = data.filter((item) =>
      selectedCartItemIds.includes(item.id),
    );

    // Actual number of physical products
    const itemCount = selectedItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    const subtotal = selectedItems.reduce((acc, item) => {
      return acc + Number(item.product?.price || 0) * item.quantity;
    }, 0);

    const shippingFee = itemCount > 0 ? 60 : 0;

    return {
      itemCount,
      subtotal,
      shippingFee,
      total: subtotal + shippingFee,
    };
  }, [data, selectedCartItemIds]);
  // 2. Generate dynamic checkout URL with selected IDs
  const checkoutUrl = `/checkout?ids=${selectedCartItemIds.join(",")}`;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* LEFT: Cart Items List */}
      <div className="flex-1 w-full space-y-3">
        {data.map((cart) => (
          <CartItemCard
            key={cart.id}
            cart={cart}
            checked={selectedCartItemIds.includes(cart.id)}
            onSelectionChange={handleSelectionChange}
          />
        ))}
      </div>

      {/* RIGHT: Order Summary Placeholder (To be replaced with your API component later) */}
      <div className="w-full lg:w-80 shrink-0 sticky top-6">
        <div className="rounded-xl border border-border bg-card p-6 text-card-foreground space-y-4">
          <OrderSummary
            summary={orderSummary}
            actionLabel="Proceed to Checkout"
            // Pass the generated URL with IDs to the button
            actionHref={checkoutUrl}
          />
        </div>
      </div>
    </div>
  );
}
