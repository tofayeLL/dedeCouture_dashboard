/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Dot,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Sample earnings data matching the chart pattern
const brandData = [
  { month: "Jan", revenue: 30000, displayMonth: "Jan" },
  { month: "Feb", revenue: 42000, displayMonth: "Feb" },
  { month: "Mar", revenue: 28000, displayMonth: "Mar" },
  { month: "Apr", revenue: 40000, displayMonth: "Apr" },
  { month: "May", revenue: 38000, displayMonth: "May" },
  { month: "Jun", revenue: 48600, displayMonth: "Jun" },
  { month: "Jul", revenue: 44000, displayMonth: "Jul" },
  { month: "Aug", revenue: 39000, displayMonth: "Aug" },
  { month: "Sep", revenue: 36000, displayMonth: "Sep" },
  { month: "Oct", revenue: 45000, displayMonth: "Oct" },
  { month: "Nov", revenue: 32000, displayMonth: "Nov" },
  { month: "Dec", revenue: 38000, displayMonth: "Dec" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (data.month === "Jun") {
      return (
        <div className="bg-[#FE0659] text-white px-3 py-2 rounded-lg shadow-lg">
          <p className="font-medium">June 2024</p>
          <p className="text-sm">Revenue: ${data.revenue.toLocaleString()}</p>
        </div>
      );
    }
    return (
      <div className="bg-[#FE0659] text-white border border-gray-200 px-3 py-2 rounded-lg shadow-lg">
        <p className="font-medium text-white">{label} 2024</p>
        <p className="text-sm  text-white">
          Revenue: ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// Custom chart container component
const ChartContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

// Find the maximum value in the data to highlight the top dot
const maxRevenue = Math.max(...brandData.map((item) => item.revenue));

export default function EarningsChart() {
  const [selectedCategory, setSelectedCategory] = useState("2024");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // Add filtering logic here based on your needs
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Brand Report
        </CardTitle>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="">
            <SelectValue placeholder="2024" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="Daily">Daily</SelectItem>
            <SelectItem value="Weekly">Weekly</SelectItem>
            <SelectItem value="Yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={brandData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#FD6B22" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#FD6B22" stopOpacity={0.09} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />
              <XAxis
                dataKey="displayMonth"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 16, fill: "#64748b" }}
                // Fix x-axis alignment
                padding={{ left: 10, right: 10 }}
                interval={0}
              />
              <YAxis
                domain={[0, 70000]}
                tickFormatter={(value) => `$${value / 1000}k`}
                ticks={[0, 10000, 20000, 30000, 40000, 50000, 60000, 70000]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 16, fill: "#64748b" }}
                // Fix y-axis alignment
                width={45}
                padding={{ top: 0, bottom: 0 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#FD6B22"
                strokeWidth={2}
                fill="url(#revenueGradient)"
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  // Highlight only the top value dot (June with 48,600)
                  if (payload.revenue === maxRevenue) {
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={6}
                        fill="#FE0659"
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    );
                  }
                  return <circle cx={cx} cy={cy} r={0} fill="#FE0659" />;
                }}
                activeDot={{
                  r: 6,
                  fill: "#FE0659",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                // Connect area to axes
                connectNulls={true}
                baseValue={0}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
