import ProductDetails from "@/components/modules/products/ProductDetails";
import { getSingleProduct } from "@/services/admin/productsManagement";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getSingleProduct(slug);
  return <ProductDetails product={result.data} />;
}
