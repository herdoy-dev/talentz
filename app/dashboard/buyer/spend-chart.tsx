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
        <Grid
          columns={{ initial: "2", md: "1fr 1fr 1fr 2fr" }}
          gap={{ initial: "6", md: "2" }}
          mb="6"
        >
          <div className="border-s ps-2">
            <p className="text-primary text-xl">Monthly Spending</p>
            <p className="text-primary font-semibold">${data.monthlySpend}</p>
          </div>

          <div className="border-s ps-2">
            <p className="text-primary text-xl">Total Spending</p>
            <p className="text-primary font-semibold">${data.totalSpend}</p>
          </div>

          <div className="border-s ps-2">
            <p className="text-primary text-xl">Average Project Cost</p>
            <p className="text-primary font-semibold">
              ${data.averateProjectCost}
            </p>
          </div>

          <Flex justify="end" className="border-s ps-2">
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
