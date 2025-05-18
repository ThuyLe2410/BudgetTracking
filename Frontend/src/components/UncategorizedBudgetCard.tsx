
import BudgetCard from "./BudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import type { expenseProps } from "../types";

export default function UncategorizedBudgetCard({
  onAddExpenseClick,
  onViewExpenseClick,
}: {
  onAddExpenseClick: () => void;
  onViewExpenseClick: () => void;
}) {
  const { getBudgetExpense } = useBudgets() as {
    getBudgetExpense: (budgetId: string) => expenseProps[];
  };
  const amount = getBudgetExpense(UNCATEGORIZED_BUDGET_ID).reduce(
    (total: number, expense: expenseProps) => total + expense.amount,
    0
  );
  if (amount === 0) return null;
  return (
    <BudgetCard
      amount={amount}
      name="Uncategorized"
      onAddExpenseClick={onAddExpenseClick}
      onViewExpenseClick={onViewExpenseClick}
    />
  );
}
