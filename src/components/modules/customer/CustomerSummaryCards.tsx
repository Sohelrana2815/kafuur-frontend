import { ShoppingCart, PackageOpen, History, Wallet } from "lucide-react";

interface CustomerSummaryProps {
  summary: {
    totalSpent: number;
    totalOrders: number;
    activeOrders: number;
    itemsInCart: number;
  };
}

export default function CustomerSummaryCards({ summary }: CustomerSummaryProps) {
  const cards = [
    { title: "Total Spent", value: `৳${summary.totalSpent.toLocaleString()}`, icon: Wallet },
    { title: "Total Orders", value: summary.totalOrders, icon: History },
    { title: "Active Orders", value: summary.activeOrders, icon: PackageOpen },
    { title: "Items in Cart", value: summary.itemsInCart, icon: ShoppingCart },
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