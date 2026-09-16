"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CustomerOrder {
  createdAt: string;
  totalAmount: string;
}
// const chartConfig = {
//   amount: {
//     label: "Spent",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig;

// Define explicit HEX color for primary chart key
const chartConfig = {
  amount: {
    label: "Spent",
    color: "#2563eb",
  },
} satisfies ChartConfig;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CustomerSpendChart({
  orders = [],
}: {
  orders: CustomerOrder[];
}) {
  // Format the data: reverse to show oldest to newest on X-axis, parse strings to numbers
  const chartData = [...orders].reverse().map((order) => ({
    date: new Date(order.createdAt).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    amount: parseFloat(order.totalAmount),
  }));

  if (chartData.length === 0) {
    return (
      <div className="h-[250px] flex items-center justify-center text-muted-foreground">
        No recent spending data.
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <AreaChart
        data={chartData}
        margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="amount"
          type="natural"
          fill="var(--color-amount)"
          fillOpacity={0.4}
          stroke="var(--color-amount)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
