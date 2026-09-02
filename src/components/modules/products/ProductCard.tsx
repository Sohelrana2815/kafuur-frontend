"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { addToCart } from "@/services/cart/cartManagement";
import { IBackendProduct } from "@/types/product.types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface IProductsCardProps {
  product: IBackendProduct;
}

export default function ProductCard({ product }: IProductsCardProps) {
  const { id, name, slug, category, images, price } = product;
  const { updateCartCountOptimistically } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const mainImage = images?.[0] || "/placeholder.svg";
  const handleAddToCart = async () => {
    if (isAddingToCart) return;

    setIsAddingToCart(true);
    updateCartCountOptimistically(1);
    try {
      const response = await addToCart(id!);

      if (!response?.success) {
        updateCartCountOptimistically(-1);
        toast.error(response?.message ?? "Failed to add item to cart.");
        return;
      }
      console.log(response.message, "from cart page");
      toast.success(`${name} added to cart!`);
    } catch {
      updateCartCountOptimistically(-1);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="group flex flex-col justify-between rounded-xl p-4 text-card-foreground transition-all border border-primary/10">
      <Link href={`/products/${slug}`}>
        {/* Product Image Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center p-4">
          <Image
            src={mainImage}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="mt-3 flex flex-col grow justify-between gap-2">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {category || "Brand"}
          </p>
          <h3 className="line-clamp-1 text-sm font-medium text-foreground">
            {name}
          </h3>
          <p className="text-sm font-semibold text-foreground">
            ${Number(price).toFixed(2)}
          </p>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          variant="default"
          size="sm"
          className="w-full mt-2 text-xs font-semibold uppercase tracking-wide transition-colors"
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
