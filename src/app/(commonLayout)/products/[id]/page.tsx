import { getProductById } from "@/actions/product";
import ProductDetailView from "@/components/modules/products/ProductDetailView";
import { notFound } from "next/navigation";

// Next.js 15 requires awaiting dynamic route params
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await the parameters to extract the ID
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  // 2. Fetch the data securely on the server
  const response = await getProductById(productId);
  const product = response?.success ? response.data : null;

  // 3. Handle 404 if product doesn't exist
  if (!product) {
    notFound();
  }

  // 4. Pass the validated payload to the Client Component
  return (
    <div className="w-full min-h-screen bg-[#09090b] text-white pt-20 pb-24 font-sans">
      <ProductDetailView product={product} />
    </div>
  );
}
