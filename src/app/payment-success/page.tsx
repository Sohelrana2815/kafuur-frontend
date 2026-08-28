import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <CheckCircle className="mx-auto h-20 w-20 text-primary" />

        <h1 className="mt-6 text-2xl font-bold">Order Successful!</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <Link href="/products">
          <Button className="mt-4">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
