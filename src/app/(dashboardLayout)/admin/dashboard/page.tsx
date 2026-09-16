import AdminSummaryCards from "@/components/modules/admin/dashboard/AdminSummaryCards";
import AdminStatusChart from "@/components/modules/admin/dashboard/AdminStatusChart";
import AdminRecentOrders from "@/components/modules/admin/dashboard/AdminRecentOrders";
import { getAdminDashboardStats } from "@/services/dashboard/dashboard.service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const statsResult = await getAdminDashboardStats();
  const data = statsResult?.data;
  //  console.log("From AdminDashboardPage:",data);
  console.log(
    "From AdminDashboardPage:",
    data?.charts?.orderStatusDistribution[0],
  );
  if (!data) return <div>Failed to load dashboard data.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold uppercase">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Track your business metrics and recent activity.
        </p>
      </div>

      {/* Top Section: Summary Cards */}
      <AdminSummaryCards summary={data.summary} />

      {/* Bottom Section: Charts & Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 border rounded-xl p-4 bg-card text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Orders by Status</h2>
          <AdminStatusChart chartData={data.charts.orderStatusDistribution} />
        </div>
        <div className="lg:col-span-2 border rounded-xl p-4 bg-card text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <AdminRecentOrders orders={data.recentOrders} />
        </div>
      </div>
    </div>
  );
}
