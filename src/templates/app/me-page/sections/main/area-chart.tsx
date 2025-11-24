"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A linear area chart";

const chartData = [
  { date: "02", views: 186 },
  { date: "03", views: 305 },
  { date: "04", views: 237 },
  { date: "06", views: 73 },
  { month: "07", views: 209 },
  { month: "08", views: 214 },
];

const chartConfig = {
  views: {
    label: "Visualizações",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function AreaChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualizações</CardTitle>
        <CardDescription>
          Visualizações totais nos últimos 30 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="views"
              type="linear"
              fill="var(--color-views)"
              fillOpacity={0.4}
              stroke="var(--color-views)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
