"use client";

import * as React from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

export type SourceOriginChartData = {
  source: string;
  visitors: number;
  fill: string;
};

export function SourceOriginChart({ data }: { data: SourceOriginChartData[] }) {
  // Gerar config dinâmica baseada nos dados
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      visitors: {
        label: "Visualizações",
      },
    };

    data.forEach((item) => {
      config[item.source] = {
        label: item.source,
        color: item.fill, // Usando a cor definida no dado
      };
    });

    return config;
  }, [data]);

  if (data.length === 0) {
    return (
      <Card className="flex flex-col h-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Origem do Tráfego</CardTitle>
          <CardDescription>Sem dados para exibir</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 flex items-center justify-center min-h-[250px]">
          <p className="text-muted-foreground text-sm">
            Nenhuma visualização registrada ainda.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Origem do Tráfego</CardTitle>
        <CardDescription>Distribuição por canal de origem</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="source"
              type="category"
              tickLine={false}
              tickMargin={0}
              width={96}
              axisLine={false}
              tickFormatter={(value) =>
                (chartConfig[value as keyof typeof chartConfig]
                  ?.label as string) || value
              }
              className="w-fit"
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
