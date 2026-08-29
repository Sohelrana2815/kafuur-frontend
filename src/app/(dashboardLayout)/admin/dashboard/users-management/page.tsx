import UsersManagementHeader from "@/components/modules/admin/usersManagement/UsersManagementHeader";
import UsersTable from "@/components/modules/admin/usersManagement/UsersTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUsers } from "@/services/user/user.service";
import { roleOptions } from "@/utils/role-options";
import {
  statusOptions,
  verificationOptions,
} from "@/utils/verification-options";
import { Suspense } from "react";

export default async function AdminUsersManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  // console.log(searchParamsObj,"from admin p management");
  const queryString = queryStringFormatter(searchParamsObj);
  const usersResult = await getAllUsers(queryString);
  const totalPages = Math.ceil(
    usersResult.meta?.total / usersResult.meta?.limit,
  );
  // console.log(usersResult);
  return (
    <div className="space-y-6">
      <UsersManagementHeader />
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
        <UsersTable users={usersResult.data} />

        {/* {productsResult.success && (
             <TablePagination
               currentPage={productsResult.meta?.page}
               totalPages={totalPages}
             />
           )} */}
      </Suspense>
    </div>
  );
}
