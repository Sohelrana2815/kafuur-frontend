import ProductsManagementHeader from "@/components/modules/admin/productsManagement/ProductsManagementHeader";
import ProductsTable from "@/components/modules/admin/productsManagement/ProductsTable";
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

export default async function AdminProductsManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  // console.log(searchParamsObj,"from admin p management");
  const queryString = queryStringFormatter(searchParamsObj);
  const productsResult = await getProducts(queryString);
  const totalPages = Math.ceil(
    productsResult.meta?.total / productsResult.meta?.limit,
  );
  // console.log(productsResult);
  return (
    <div className="space-y-6">
      <ProductsManagementHeader />
      <div className="flex space-x-2">
        <Suspense fallback={null}>
          <SearchFilter
            paramName="searchTerm"
            placeholder="Search products..."
          />
          <SelectFilter
            paramName="category"
            placeholder="Category"
            options={categoryOptions}
          />
          <SelectFilter
            paramName="sort"
            placeholder="Sort by price"
            options={sortOptions}
          />
          <RefreshButton />
        </Suspense>
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <ProductsTable products={productsResult.data} />

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
