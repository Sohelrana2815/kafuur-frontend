import ProductGrid from "@/components/modules/products/ProductsGrid";
import ProductsPageHeader from "@/components/modules/products/ProductsPageHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getProducts } from "@/services/admin/productsManagement";
import { categoryOptions } from "@/utils/category-options";
import { sortOptions } from "@/utils/sort-options";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // console.log(await searchParams,"From searchparams"); //?key=value => {}
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const productsResult = await getProducts(queryString);
  const totalPages = Math.ceil(
    productsResult.meta?.total / productsResult.meta?.limit,
  );
  // console.log(productsResult, "From Products Page");
  return (
    <div className="space-y-6">
      <ProductsPageHeader title="All Body sprays" />
      <div className="flex space-x-2">
        <Suspense fallback={null}>
          <SearchFilter
            paramName="searchTerm"
            placeholder="Search products..."
          />
          <SelectFilter
            paramName="category"
            placeholder="Filter by category"
            options={categoryOptions}
          />
          <SelectFilter
            paramName="sort"
            placeholder="Filter by price"
            options={sortOptions}
          />
          <RefreshButton />
        </Suspense>
      </div>

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <ProductGrid data={productsResult.data} />

        {productsResult.success && (
          <TablePagination
            currentPage={productsResult.meta?.page}
            totalPages={totalPages}
          />
        )}
      </Suspense>
    </div>
  );
}
