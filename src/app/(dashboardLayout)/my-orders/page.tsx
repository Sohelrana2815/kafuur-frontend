import CustomerOrdersTable from "@/components/modules/order/CustomerOrdersTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getMyOrders } from "@/services/order/myOrders";
import { orderStatusOptions } from "@/utils/order-options";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function CustomerOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  //   const queryString = queryStringFormatter(searchParamsObj);
  const ordersResult = await getMyOrders();

  const totalPages = Math.ceil(
    (ordersResult.meta?.total || 0) / (ordersResult.meta?.limit || 10),
  );

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="My Orders"
        description="View your order history and manage active orders."
      />

      <div className="flex space-x-2">
        <Suspense fallback={null}>
          <SearchFilter paramName="searchTerm" placeholder="Search orders..." />
          <SelectFilter
            paramName="status"
            placeholder="Status"
            options={orderStatusOptions}
          />
          <RefreshButton />
        </Suspense>
      </div>

      <Suspense fallback={<TableSkeleton columns={7} rows={8} />}>
        <CustomerOrdersTable orders={ordersResult.data || []} />

        {ordersResult.success && totalPages > 1 && (
          <TablePagination
            currentPage={ordersResult.meta?.page || 1}
            totalPages={totalPages}
          />
        )}
      </Suspense>
    </div>
  );
}
