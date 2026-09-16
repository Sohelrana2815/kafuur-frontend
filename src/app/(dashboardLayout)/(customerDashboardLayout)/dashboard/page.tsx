import CustomerRecentOrders from "@/components/modules/customer/CustomerRecentOrders";
import CustomerSpendChart from "@/components/modules/customer/CustomerSpendChart";
import CustomerSummaryCards from "@/components/modules/customer/CustomerSummaryCards";
import { getCustomerDashboardStats } from "@/services/dashboard/dashboard.service";

export const dynamic = "force-dynamic";

export default async function CustomerDashboardPage() {
  const statsResult = await getCustomerDashboardStats();
  const data = statsResult?.data;

  if (!data) return <div>Failed to load dashboard data.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold uppercase">My Account</h1>
        <p className="text-muted-foreground mt-1">
          Manage your orders and track your activity.
        </p>
      </div>

      <CustomerSummaryCards summary={data.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-xl p-4 bg-card text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Spending Trend</h2>
          <CustomerSpendChart orders={data.recentOrders} />
        </div>
        <div className="border rounded-xl p-4 bg-card text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <CustomerRecentOrders orders={data.recentOrders} />
        </div>
      </div>
    </div>
  );
}
