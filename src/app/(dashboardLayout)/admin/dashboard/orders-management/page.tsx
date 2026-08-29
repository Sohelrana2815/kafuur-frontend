import OrdersManagementHeader from "@/components/modules/admin/ordersManagement/OrdersManagementHeader";
import OrdersTable from "@/components/modules/admin/ordersManagement/OrdersTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllOrders } from "@/services/order/orderManagement";
import { roleOptions } from "@/utils/role-options";
import { statusOptions, verificationOptions } from "@/utils/verification-options";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export default async function AdminOrdersManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const ordersResult = await getAllOrders(queryString);
  const totalPages = Math.ceil(
    ordersResult.meta?.total / ordersResult.meta?.limit,
  );
  console.log(ordersResult, "From AdminOrdersManagementPage");
  return  <div className="space-y-6">
        <OrdersManagementHeader />
        <div className="flex space-x-2">
          <Suspense fallback={null}>
            <SearchFilter
              paramName="searchTerm"
              placeholder="Find users by name, email.."
            />
            <SelectFilter
              paramName="role"
              placeholder="Role"
              options={roleOptions}
            />
            <SelectFilter
              paramName="isVerified"
              placeholder="Verification"
              options={verificationOptions}
            />
            <SelectFilter
              paramName="status"
              placeholder="Status"
              options={statusOptions}
            />
            <RefreshButton />
          </Suspense>
        </div>
        <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
          <OrdersTable orders={ordersResult.data} />
  
          {/* {productsResult.success && (
               <TablePagination
                 currentPage={productsResult.meta?.page}
                 totalPages={totalPages}
               />
             )} */}
        </Suspense>
      </div>;
}
