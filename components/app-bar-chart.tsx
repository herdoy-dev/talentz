"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  ResponsiveContainer,
} from "recharts";

export interface BarChartData {
  [key: string]: string | number;
}

export interface BarChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface AppBarChartProps {
  data: BarChartData[];
  config: BarChartConfig;
  className?: string;
  height?: number;
  width?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  barRadius?: number;
  xAxisKey: string;
  barKeys: string[];
}

export function AppBarChart({
  data,
  config,
  className = "w-full h-full",
  height = 400,
  showGrid = true,
  showLabels = true,
  barRadius = 8,
  xAxisKey = "month",
  barKeys = ["desktop"],
}: AppBarChartProps) {
  return (
    <ChartContainer config={config} className={className}>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 30,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >
            {showGrid && <CartesianGrid vertical={false} />}
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => String(value).slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {barKeys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={config[key]?.color || "var(--color-primary)"}
                radius={barRadius}
              >
                {showLabels && (
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                )}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
