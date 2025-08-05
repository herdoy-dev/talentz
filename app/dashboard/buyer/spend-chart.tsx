"use client";

import { AppAreaChart } from "@/components/app-area-chart";
import Switch from "@/components/switch";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import SpendReport from "@/schemas/SpendReport";
import { Flex, Grid } from "@radix-ui/themes";
import { useState } from "react";

export const description = "An area chart with gradient fill";

const chartConfig = {
  spend: {
    label: "Spend",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig;

const options = ["Monthly", "Yearly"] as const;

interface Props {
  data: SpendReport;
}

const SpendChart = ({ data }: Props) => {
  const [current, setCurrent] = useState<(typeof options)[number]>("Monthly");
  return (
    <Card className="rounded-3xl">
      <CardContent>
        <Grid columns={"1fr 1px 1fr 1px 1fr 1px 2fr"} gap="2" mb="6">
          <div>
            <p className="text-primary">Monthly Spending</p>
            <h3>${data.monthlySpend}</h3>
          </div>
          <div className="bg-gray-300" />
          <div>
            <p className="text-primary">Total Spending</p>
            <h3>${data.totalSpend}</h3>
          </div>
          <div className="bg-gray-300" />
          <div>
            <p className="text-primary">Average Project Cost</p>
            <h3>${data.averateProjectCost}</h3>
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
        <AppAreaChart
          data={data.monthlySpendReport}
          config={chartConfig}
          xKey="month"
        />
      </CardContent>
    </Card>
  );
};

export default SpendChart;
