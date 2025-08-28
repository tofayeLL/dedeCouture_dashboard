"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"


const data = [
  { day: "Mon", approved: 0, rejected: 0 },
  { day: "Tue", approved: 15, rejected: 8 },
  { day: "Wed", approved: 25, rejected: 5 },
  { day: "Thu", approved: 45, rejected: 12 },
  { day: "Fri", approved: 38, rejected: 10 },
  { day: "Sat", approved: 52, rejected: 18 },
  { day: "Sun", approved: 48, rejected: 14 },
]

export function BrandStatusChart() {

  /*   const [selectedCategory, setSelectedCategory] = useState("Monthly");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // Add filtering logic here based on your needs
  };
 */




  return (
    <Card className="w-full  h-full max-w-2xl bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Review Status</h2>
         {/* <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="">
              <SelectValue placeholder="Monthly" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Yearly">Yearly</SelectItem>
            </SelectContent>
          </Select> */} 
      </CardHeader>
      <CardContent className="pb-6">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                className="text-gray-500"
              />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="approved"
                stroke="#22C55E"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: "#22C55E" }}
              />
              <Line
                type="monotone"
                dataKey="rejected"
                stroke="#EC4899"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: "#EC4899" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center items-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Good Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-pink-500 rounded"></div>
            <span className="text-sm text-gray-700">Bad Reviews</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
