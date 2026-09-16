"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartData {
  status: string;
  count: number;
}

const chartConfig = {
  count: { label: "Orders" },
  PROCESSING: { label: "Processing", color: "#f59e0b" },
  CONFIRMED: { label: "Confirmed", color: "#3b82f6" },
  DELIVERED: { label: "Delivered", color: "#10b981" },
  PENDING: { label: "Pending", color: "#eab308" },
  CANCELLED: { label: "Cancelled", color: "#ef4444" },
} satisfies ChartConfig;

export default function AdminStatusChart({
  chartData = [],
}: {
  chartData?: ChartData[];
}) {
  // 1. Guard clause against undefined/empty data array
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
        No order status data available.
      </div>
    );
  }

  // 2. Map fill directly to shadcn's auto-generated CSS variables
  // const formattedData = chartData.map((item) => ({
  //   ...item,
  //   fill: `var(--color-${item.status})`,
  // }));

  const formattedData = chartData.map((item) => ({
    ...item,
    fill: `var(--color-${item.status})`,
  }));

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={formattedData}
          dataKey="count"
          nameKey="status"
          innerRadius={60}
          strokeWidth={5}
        >
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
