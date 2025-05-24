import type { spendingByBudgetProps } from "../../types";

export default function SpendingByBudgetType({
  data,
}: {
  data: Record<string, spendingByBudgetProps>;
}) {
  return (
    <div className="h-80 w-full m-4">
      <div>Spending by Budget Type</div>
    </div>
  );
}
