import MyProfile from "@/components/modules/auth/MyProfile";
import ProfileManagementHeader from "@/components/modules/auth/ProfileManagementHeader";
import { getMyProfile } from "@/services/auth/auth.service";

export const dynamic = "force-dynamic";
export default async function MyProfilePage() {
  const profileResult = await getMyProfile();
  console.log("from my profile page:", profileResult);

  return (
    <div className="space-y-6">
      <ProfileManagementHeader profileData={profileResult.data} />
      <MyProfile profileData={profileResult.data} />
    </div>
    // {/* <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
    //   <ProductsTable products={productsResult.data} />

    //   {productsResult.success && (
    //     <TablePagination
    //       currentPage={productsResult.meta?.page}
    //       totalPages={totalPages}
    //     />
    //   )}
    // </Suspense> */}
  );
}
