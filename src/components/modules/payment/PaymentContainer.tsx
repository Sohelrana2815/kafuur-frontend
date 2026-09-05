"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Truck } from "lucide-react";
import { toast } from "sonner";
import { IOrderSummary } from "@/types/order.types";
import { createOrder } from "@/services/order/orderManagement";
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

  const handlePlaceOrder = () => {
    startTransition(async () => {
      const result = await createOrder({ cartItemIds, paymentMethod });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      if (paymentMethod === "ONLINE" && result.data?.paymentUrl) {
        // Direct redirect to Stripe Hosted Page
        window.location.href = result.data.paymentUrl;
      } else {
        // Direct redirect to Internal Success Page for COD
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
          className="w-full mt-4 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isPending ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
