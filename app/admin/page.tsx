"use client";
import { Calendar } from "@/components/calender";
import { Grid } from "@radix-ui/themes";
import { SalseChart } from "./salse-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1>Dashboard</h1>
      <Grid columns={{ initial: "1", md: "4fr 2fr" }} gap="6">
        <div className="space-y-6">
          <SalseChart />
        </div>
        <div className="space-y-6">
          <Calendar />
        </div>
      </Grid>
    </div>
  );
}
