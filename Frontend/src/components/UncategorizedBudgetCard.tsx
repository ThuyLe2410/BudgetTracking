
import BudgetCard from "./BudgetCard";
import {  useBudgets } from "../contexts/BudgetContext";
import type { expenseProps } from "../types";

export default function UncategorizedBudgetCard({
  onAddExpenseClick,
  onViewExpenseClick,
}: {
  onAddExpenseClick: () => void;
  onViewExpenseClick: () => void;
}) {
  const { getBudgetExpense } = useBudgets() as {
    getBudgetExpense: (budgetId: number) => expenseProps[];
  };
  const amount = getBudgetExpense(1).reduce(
    (total: number, expense: expenseProps) => total + expense.amount,
    0
  );

  return (
    <BudgetCard
      amount={amount}
      max={amount}
      name={"Uncategorized"}
      onAddExpenseClick={onAddExpenseClick}
      onViewExpenseClick={onViewExpenseClick}
    />
  );
}
