"use client";

import Link from "next/link";

interface IOrderSummary {
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
}

interface IOrderSummaryProps {
  summary: IOrderSummary;
  actionLabel: string;
  actionHref: string;
}

export default function OrderSummary({
  summary,
  actionLabel,
  actionHref,
}: IOrderSummaryProps) {
  const { itemCount, subtotal, shippingFee, total } = summary;
  console.log("From order summary", itemCount, subtotal, summary);
  const hasSelectedItems = itemCount > 0;

  return (
    <div>
      <h2 className="text-base font-bold uppercase tracking-wider text-foreground">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>

          <span className="text-sm font-semibold">${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Shipping Fee</span>

          <span className="text-sm font-semibold">
            ${shippingFee.toFixed(2)}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-bold">Total</span>

          <span className="text-lg font-bold text-primary">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Proceed */}
        <Link
          href={hasSelectedItems ? actionHref : "#"}
          onClick={(e) => {
            if (!hasSelectedItems) e.preventDefault();
          }}
          className="block w-full rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold uppercase text-primary-foreground transition-opacity hover:opacity-90 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          aria-disabled={!hasSelectedItems}
        >
          {actionLabel} ({itemCount})
        </Link>
      </div>
    </div>
  );
}
