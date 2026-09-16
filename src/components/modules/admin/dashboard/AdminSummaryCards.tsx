import { Users, ShoppingBag, Package, DollarSign } from "lucide-react";

interface AdminSummaryProps {
  summary: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
  };
}

export default function AdminSummaryCards({ summary }: AdminSummaryProps) {
  const cards = [
    { title: "Total Revenue", value: `৳${summary.totalRevenue.toLocaleString()}`, icon: DollarSign },
    { title: "Total Orders", value: summary.totalOrders, icon: ShoppingBag },
    { title: "Total Customers", value: summary.totalCustomers, icon: Users },
    { title: "Active Products", value: summary.totalProducts, icon: Package },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="flex items-center p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
          <div className="p-3 bg-primary/10 rounded-full mr-4">
            <card.icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
            <h3 className="text-2xl font-bold">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}