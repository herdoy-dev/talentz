"use client";
import { Calendar } from "@/components/calender";
import RoyaltyProgress from "@/components/royalty-progress";
import { cn } from "@/lib/utils";
import { Flex, Grid } from "@radix-ui/themes";
import { useState } from "react";
import Switch from "../switch";
import JobChart from "./job-chart";
import { MonthlyIncomeChart } from "./monthly-income-chart";
import MyBalance from "./my-balance";
import { ViewsChart } from "./views-chart";

const options = ["Monthly", "Yearly"] as const;
const chartData = [
  { browser: "Design & Creative", jobCount: 4, fill: "#28C3AB" },
  { browser: "Development & IT", jobCount: 2, fill: "#39F3BB" },
  { browser: "AI Services", jobCount: 3, fill: "#1A9395" },
  { browser: "Salse & Marketing", jobCount: 3, fill: "#E2F397" },
];

export default function DashboardPage() {
  const [current, setCurrent] = useState<(typeof options)[number]>("Monthly");
  return (
    <div className="space-y-4">
      <h1>Dashboard</h1>
      <Grid columns={{ initial: "1", md: "4fr 2fr" }} gap="6">
        <div className="space-y-6">
          <MonthlyIncomeChart />
          <ViewsChart />
          <RoyaltyProgress />
        </div>
        <div className="space-y-6">
          <MyBalance />
          <Calendar />
          <div className="space-y-6">
            <div className="bg-white border rounded-3xl p-6">
              <Flex align="center" justify="between">
                <h3>Active Tasks</h3>
                <Switch
                  options={options}
                  selected={current}
                  onChange={setCurrent}
                />
              </Flex>
              <div>
                <JobChart />
                <Flex align="center">
                  <Grid columns="2" gap="5">
                    {chartData.map((item, i) => (
                      <Grid columns={"10px 1fr"} gap="1" key={i}>
                        <div
                          className={cn("rounded-3xl")}
                          style={{
                            background: item.fill,
                          }}
                        />
                        <div>
                          <p>Design & Creative</p>
                          <p>
                            <span className="!text-2xl font-bold">12</span> Job
                          </p>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </Flex>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
}
