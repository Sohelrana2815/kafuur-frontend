interface RecentOrder {
  id: string;
  totalAmount: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function CustomerRecentOrders({
  orders,
}: {
  orders: RecentOrder[];
}) {
  if (orders.length === 0) {
    return (
      <div className="text-muted-foreground py-4">
        You have no recent orders.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b last:border-0 hover:bg-muted/30"
            >
              <td className="px-4 py-3 font-medium">
                {order.id.slice(0, 8)}...
              </td>
              <td className="px-4 py-3">৳{order.totalAmount}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-3">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
