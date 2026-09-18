"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Truck } from "lucide-react";
import { toast } from "sonner";
import { IOrderSummary } from "@/types/order.types";
import { createOrder } from "@/services/order/orderManagement";
import { useCartStore } from "@/store/useCartStore";
export const dynamic = "force-dynamic";

interface IPaymentContainerProps {
  cartItemIds: string[];
  summary: IOrderSummary;
}

export default function PaymentContainer({
  cartItemIds,
  summary,
}: IPaymentContainerProps) {
  const [paymentMethod, setPaymentMethod] = useState<"ONLINE" | "COD">(
    "ONLINE",
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // 1. Import the optimistic updater from your Zustand store
  const updateCartCountOptimistically = useCartStore(
    (state) => state.updateCartCountOptimistically,
  );
  const handlePlaceOrder = () => {
    startTransition(async () => {
      const payload = {
        cartItemIds,
        paymentMethod,
      };

      const result = await createOrder(payload);

      // 1. Return early if the server action failed
      if (!result.success) {
        toast.error(result.message || "Failed to place order.");
        return;
      }

      // 2. Instantly update UI cart count on success
      if (summary?.itemCount) {
        updateCartCountOptimistically(-summary.itemCount);
      }

      // 3. Perform a single redirect based on the payment method
      if (paymentMethod === "ONLINE" && result.data?.paymentUrl) {
        window.location.href = result.data.paymentUrl;
      } else {
        toast.success("Order placed successfully!");
        router.push(`/payment-success?orderId=${result.data?.order?.id}`);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT: Method Cards */}
      <div className="lg:col-span-2 space-y-4">
        {/* Stripe Card */}
        <div
          onClick={() => setPaymentMethod("ONLINE")}
          className={`cursor-pointer p-5 rounded-xl border-2 flex items-center gap-4 transition-all ${
            paymentMethod === "ONLINE"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <CreditCard className="w-8 h-8 text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Pay Online (Stripe)</h3>
            <p className="text-sm text-muted-foreground">
              Credit/Debit Card, Mobile Wallet
            </p>
          </div>
        </div>

        {/* COD Card */}
        <div
          onClick={() => setPaymentMethod("COD")}
          className={`cursor-pointer p-5 rounded-xl border-2 flex items-center gap-4 transition-all ${
            paymentMethod === "COD"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <Truck className="w-8 h-8 text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Cash on Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Pay when your order arrives at your door
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: Summary & Submit */}
      <div className="p-6 rounded-xl border border-border bg-card space-y-4 h-fit">
        <h3 className="font-bold text-lg">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Items ({summary.itemCount})</span>
            <span>৳{summary.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>৳{summary.shippingFee}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-base">
            <span>Total</span>
            <span>৳{summary.total}</span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={isPending}
          className="w-full mt-4 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {isPending ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
