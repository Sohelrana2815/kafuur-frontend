import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IProductDetails } from "@/types/product.types";
import { ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import Image from "next/image";

export interface IProductDetailsProps {
  product: IProductDetails;
}

export default function ProductDetails({ product }: IProductDetailsProps) {
  const mainImage = product.images?.[0] || "/placeholder.svg";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground sm:mb-8"
      >
        <span className="cursor-pointer transition-colors hover:text-foreground">
          Products
        </span>

        <span>/</span>

        <span className="cursor-pointer transition-colors hover:text-foreground">
          {product.category}
        </span>

        <span>/</span>

        <span
          className="min-w-0 truncate font-medium text-foreground"
          aria-current="page"
        >
          {product.name}
        </span>
      </nav>

      {/* Main Product Section */}
      <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Product Image */}
        <div className="w-full">
          <div className="relative mx-auto aspect-square w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-muted/30">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6 sm:p-8 lg:p-10"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex min-w-0 flex-col pt-0 lg:pt-4">
          {/* Category */}
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            {product.category}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-5 flex items-end gap-2 sm:mt-6">
            <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <Separator className="my-6 sm:my-8" />

          {/* Short Description */}
          <div className="text-muted-foreground">
            <p className="text-sm leading-7 sm:text-base sm:leading-relaxed lg:text-lg">
              {product.shortDescription}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:mt-10">
            <Button
              size="lg"
              type="button"
              className="h-12 w-full text-base font-semibold sm:h-14"
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </Button>
          </div>

          {/* Value propositions */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                <Truck size={20} />
              </div>

              <div className="min-w-0">
                <span className="block text-sm font-semibold">
                  Standard Delivery
                </span>

                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                <ShieldCheck size={20} />
              </div>

              <div className="min-w-0">
                <span className="block text-sm font-semibold">
                  Secure Transaction
                </span>

                <span className="mt-0.5 block text-xs text-muted-foreground">
                  SSL Encrypted
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Long Description */}
      <section className="mt-12 border-t border-border pt-10 sm:mt-16 sm:pt-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Product details of
          </h2>

          <div className="mt-6 text-muted-foreground sm:mt-8">
            <p className="whitespace-pre-line text-sm leading-7 sm:text-base sm:leading-8">
              {product.longDescription}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
