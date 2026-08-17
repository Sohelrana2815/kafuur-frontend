import ProductsManagementHeader from "@/components/modules/admin/productsManagement/ProductsManagementHeader";
import ProductsTable from "@/components/modules/admin/productsManagement/ProductsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getProducts } from "@/services/admin/productsManagement";
import { categoryOptions } from "@/utils/category-options";
import { Suspense } from "react";


export default async function AdminProductsManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParamsObj = await searchParams;
     const queryString = queryStringFormatter(searchParamsObj);
  const productsResult = await getProducts();
  return (
    <div className="space-y-6">
      <ProductsManagementHeader product={productsResult.data} />
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search products..." />
        <SelectFilter
          paramName="category"
          placeholder="Filter by category"
          options={categoryOptions}
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <ProductsTable products={productsResult.data} />
        {/* <TablePagination
          currentPage={productsResult.meta.page}
          totalPages={totalPages}
        /> */}
      </Suspense>
    </div>
  );
}
