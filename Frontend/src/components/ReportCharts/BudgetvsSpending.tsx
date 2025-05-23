import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Rectangle,
  BarChart,
} from "recharts";
import type { spendingByBudgetType } from "../../types";

export default function BudgetvsSpending({
  data,
}: {
  data: spendingByBudgetType[];
}) {
  return (
    <div className="h-80 w-full m-4">
      <div>Budget vs Spending</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="budgetName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="budgetMax"
            fill="#82ca9d"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="spendingAmount"
            fill="red"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
