import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import type { spendingByBudgetProps } from "../../types";
import { useState } from "react";

export default function SpendingByBudgetType({
  data,
}: {
  data: Record<string, spendingByBudgetProps>;
}) {
  const [selectedBudgetType, setSelectedBudgetType] = useState("Total");
  const pieData = data[selectedBudgetType]?.items;
  const COLORS = generateColors(pieData.length);
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"}>
        {`${pieData[index].expenseName} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="h-100 w-full m-4">
      <div>Spending by Budget Type</div>

      <div className="flex">
        <div> Budget Type: </div>
        <select
          value={selectedBudgetType}
          onChange={(e) => setSelectedBudgetType(e.target.value)}>
          {Object.entries(data).map(([key, value]) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <div>Amount: {data[selectedBudgetType]?.amount ?? 0}</div>
      </div>
      <div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={800} height={800}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              dataKey="amount"
              nameKey="expenseName"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              label={renderCustomizedLabel}>
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function generateColors(count: number) {
  const baseColors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28BD4",
    "#FF6B6B",
    "#4DD0E1",
  ];
  return Array.from(
    { length: count },
    (_, i) => baseColors[i % baseColors.length]
  );
}
