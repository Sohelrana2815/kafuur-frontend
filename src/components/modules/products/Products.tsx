"use client";

import { useCart } from "@/context/CartContext";
import { BackendProduct } from "@/types/product.types";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

// Aligning interface structure explicitly with your backend Prisma fields

interface ProductsProps {
  initialProducts: BackendProduct[];
}

export default function Products({ initialProducts }: ProductsProps) {
  const { addToCart } = useCart();
  // Empty State Safe Handling
  if (!initialProducts || initialProducts.length === 0) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center border border-dashed border-white/[0.05] rounded-xl ">
        <p className="text-sm text-neutral-400 font-light tracking-wide">
          No fragrance products were found in our store database catalog.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10">
      {initialProducts.map((product) => {
        // Safe assignment parameters for multiple image options
        const primaryImage =
          product.images && product.images.length > 0
            ? product.images[0]
            : null;

        // Dynamically guess/derive the brand string using the first word of the name field
        const fallbackBrand = product.name.split(" ")[0] || "KAFUUR";

        return (
          <div key={product.id} className="group flex flex-col space-y-3">
            {/* Card Image Wrapper */}
            <div className="relative aspect-[4/5] w-full rounded-lg bg-gradient-to-b from-[#18181b] to-[#121214] border border-white/[0.04] overflow-hidden flex flex-col items-center justify-center transition-colors duration-300 group-hover:border-white/[0.09]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_65%)] pointer-events-none" />

              {primaryImage ? (
                // Display the primary image retrieved from Cloudinary
                <Image
                  src={primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={500}
                  height={500}
                />
              ) : (
                // Standard default luxury perfume fallback silhouette icon
                <svg
                  className="w-14 h-14 text-neutral-700/60 transition-transform duration-500 group-hover:scale-105"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15m15 0a3 3 0 01-3 3h-9a3 3 0 01-3-3m15 0a3 3 0 00-3-3h-9a3 3 0 00-3 3m16.5-3V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                  />
                </svg>
              )}

              <span className="absolute bottom-3 right-3 text-[9px] uppercase tracking-widest  bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs font-medium">
                {product.category.toLowerCase()}
              </span>
            </div>

            {/* Product Details */}
            <div className="flex flex-col space-y-1.5 px-0.5">
              <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">
                {fallbackBrand}
              </span>
              <h3
                className="text-xs md:text-sm font-normal text-white tracking-wide truncate group-hover:text-neutral-200 transition-colors"
                title={product.name}
              >
                <Link
                  href={`/products/${product.id}`}
                  className="hover:text-pink-500"
                >
                  {product.name}
                </Link>
              </h3>
              <span className="text-xs font-semibold text-neutral-400">
                ${Number(product.price).toFixed(2)}
              </span>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-1">
              <button
                // 3. Trigger the function and show a notification
                onClick={(e) => {
                  e.preventDefault(); // Prevents link navigation if wrapped in an anchor later
                  addToCart(product);
                  toast.success(`${product.name} added to cart`);
                }}
                className="w-full py-2.5 px-4 text-[11px] font-bold tracking-widest text-neutral-400 border border-neutral-800 bg-transparent rounded uppercase transition-colors duration-200 hover:text-white hover:border-neutral-500 active:scale-[0.98]"
              >
                Add To Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
