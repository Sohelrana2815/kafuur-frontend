"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartData {
  status: string;
  count: number;
}

const chartConfig = {
  count: { label: "Orders" },
  PROCESSING: { label: "Processing", color: "#FBF5DD" },
  CONFIRMED: { label: "Confirmed", color: "#86BCBD" },
  DELIVERED: { label: "Delivered", color: "#063B00" },
  PENDING: { label: "Pending", color: "#FED24F" },
  CANCELLED: { label: "Cancelled", color: "#D90000" },
} satisfies ChartConfig;

export default function AdminStatusChart({
  chartData = [],
}: {
  chartData?: ChartData[];
}) {
  // 1. Guard clause against undefined/empty data array
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex h-62.5 items-center justify-center text-sm text-muted-foreground">
        No order status data available.
      </div>
    );
  }

  const formattedData = chartData.map((item) => ({
    ...item,
    fill: `var(--color-${item.status})`,
  }));

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-75"
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
          // innerRadius={60}
          strokeWidth={5}
        >
          <ChartLegend
            content={<ChartLegendContent nameKey="status" />}
            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
          />
          {/* {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))} */}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
