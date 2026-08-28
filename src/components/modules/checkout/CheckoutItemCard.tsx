import { ICartItem } from "@/types/cart.types";
import Image from "next/image";

interface ICheckoutItemCardProps {
  cart: ICartItem;
}

export default function CheckoutItemCard({ cart }: ICheckoutItemCardProps) {
  const { product, quantity } = cart;
  const price = Number(product?.price || 0);
  const itemTotal = price * quantity;
  const mainImage = product?.images?.[0] || "/placeholder.svg";
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-4">
        {/* Image */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={mainImage}
            alt={product?.name || "Product image"}
            fill
            className="object-contain p-2"
          />
        </div>

        {/* Product information */}
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold">
            {product?.name || "Unnamed Product"}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            ${price.toFixed(2)} × {quantity}
          </p>
        </div>

        {/* Item total */}
        <div className="shrink-0 text-right">
          <p className="text-sm text-muted-foreground">Subtotal</p>

          <p className="text-base font-bold text-primary">
            ${itemTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
