import { getUserInfo } from "@/services/auth/getUserInfo";
import { DashboardNavbarContent } from "./DashboardNavbarContent";
import { UserInfo } from "@/types/user.interface";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";

export default async function DashboardNavbar() {
  const userInfo = await getUserInfo() as UserInfo 
   const navItems = getNavItemsByRole(userInfo?.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role);
  return <DashboardNavbarContent userInfo = {userInfo}
       navItems={navItems}
      dashboardHome={dashboardHome}
  />
}
