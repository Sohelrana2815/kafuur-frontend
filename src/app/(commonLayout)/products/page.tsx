import Products from "@/components/modules/products/Products";
import { getAllProducts } from "@/actions/product";

export default async function ProductPage() {
  // 1. Fetch live database records securely on the server
  const response = await getAllProducts();
  const initialProducts = response?.success ? response.data : [];

  return (
    <div className="w-full min-h-screen bg-[#09090b] text-white pt-24 pb-24 font-sans">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-2 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider uppercase font-heading text-white">
            All Products
          </h2>
          <p className="text-xs text-neutral-500 tracking-wide font-light">
            Displaying our curated collection of premium fragrances
          </p>
        </div>

        {/* Future Filter & Search layout space */}
        <div className="w-full h-px bg-white/[0.04] mb-8" />

        {/* 2. Pass live data down as a prop to your interactive client grid */}
        <Products initialProducts={initialProducts} />
      </div>
    </div>
  );
}
