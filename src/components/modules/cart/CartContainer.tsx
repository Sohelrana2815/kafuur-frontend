"use client";

import { ICartItem } from "@/types/cart.types";
import CartItemCard from "./CartItemCard";
import OrderSummary from "./OrderSummary";
import { useEffect, useState } from "react";
import { getOrderSummary } from "@/services/order/orderManagement";

interface ICartContainerProps {
  data: ICartItem[];
}
interface IOrderSummary {
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
}
const emptySummary: IOrderSummary = {
  itemCount: 0,
  subtotal: 0,
  shippingFee: 0,
  total: 0,
};

export default function CartContainer({ data }: ICartContainerProps) {
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<string[]>([]);
  const [orderSummary, setOrderSummary] = useState<IOrderSummary>(emptySummary);

  const handleSelectionChange = (cartItemId: string, isChecked: boolean) => {
    setSelectedCartItemIds((prevIds) => {
      if (isChecked) {
        // Only add if it doesn't already exist
        return prevIds.includes(cartItemId)
          ? prevIds
          : [...prevIds, cartItemId];
      }
      // Remove the ID
      return prevIds.filter((id) => id !== cartItemId);
    });
  };

  useEffect(() => {
    let ignore = false; // Prevents race conditions if the user clicks quickly

    const fetchSummary = async () => {
      // If nothing is selected, reset the summary to zero
      if (selectedCartItemIds.length === 0) {
        setOrderSummary(emptySummary);
        return;
      }

      try {
        const result = await getOrderSummary(selectedCartItemIds);

        if (ignore) return;

        // If the API call is successful, update the state
        if (result.success && result.data) {
          setOrderSummary({
            itemCount: result.data.itemCount,
            subtotal: Number(result.data.subtotal),
            shippingFee: Number(result.data.shippingFee),
            total: Number(result.data.total),
          });
        } else {
          setOrderSummary(emptySummary);
          console.error(result.message || "Failed to fetch order summary");
        }
      } catch (error) {
        if (ignore) return;
        setOrderSummary(emptySummary);
        console.error("Error fetching summary:", error);
      }
    };

    fetchSummary();

    // Cleanup function runs when the component unmounts or selected IDs change
    return () => {
      ignore = true;
    };
  }, [selectedCartItemIds, data]);
  // ^ The array above tells React: "Run this effect every time selectedCartItemIds changes"

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
          <OrderSummary summary={orderSummary} />
        </div>
      </div>
    </div>
  );
}
