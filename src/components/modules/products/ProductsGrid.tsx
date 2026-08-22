import { IBackendProduct } from "@/types/product.types";
import ProductCard from "./ProductCard";

interface IProductsGridProps {
  data: IBackendProduct[];
}

export default function ProductsGrid({ data }: IProductsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
