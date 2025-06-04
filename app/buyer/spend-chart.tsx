"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Flex, Grid } from "@radix-ui/themes";
import { useState } from "react";
import Switch from "../switch";

export const description = "An area chart with gradient fill";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 143 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const options = ["Monthly", "Yearly"] as const;

const SpendChart = () => {
  const [current, setCurrent] = useState<(typeof options)[number]>("Monthly");
  return (
    <Card className="rounded-3xl">
      <CardContent>
        <Grid columns={"1fr 1px 1fr 1px 1fr 1px 2fr"} gap="2" mb="6">
          <div>
            <p className="text-primary">Monthly Spending</p>
            <h3>$15000</h3>
          </div>
          <div className="bg-gray-300" />
          <div>
            <p className="text-primary">Total Spending</p>
            <h3>$15000</h3>
          </div>
          <div className="bg-gray-300" />
          <div>
            <p className="text-primary">Average Project Cost</p>
            <h3>$15000</h3>
          </div>
          <div className="bg-gray-300" />
          <Flex justify="end">
            <div>
              <Switch
                options={options}
                selected={current}
                onChange={setCurrent}
              />
            </div>
          </Flex>
        </Grid>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1A9395" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1A9395" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-primary)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SpendChart;
