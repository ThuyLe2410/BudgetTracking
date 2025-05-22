import { useBudgets, TOTAL_BUDGET_ID } from "../contexts/BudgetContext";
import type { budgetProps, expenseProps } from "../types";

export default function ViewExpenseModal({
  budgetId,
  handleClose,
}: {
  budgetId: number | null;
  handleClose: () => void;
}) {
  const { budgets, expenses, getBudgetExpense, deleteExpense } =
    useBudgets() as {
      budgets: budgetProps[];
      expenses: expenseProps[];
      getBudgetExpense: (budgetId: number | null) => expenseProps[];
      deleteExpense: (expense: expenseProps) => void;
    };
  const displayedExpenses =
    budgetId === TOTAL_BUDGET_ID ? expenses : getBudgetExpense(budgetId);
  console.log("displayedExpenses",displayedExpenses)
  const budget =
    budgetId === TOTAL_BUDGET_ID
      ? { name: "Total", id: null }
      : budgets.find((budget: budgetProps) => budget.id === budgetId);

  if (!budgetId) return null;

  return (
    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50 w-full  max-w-lg border-1 border-b-gray-200 bg-white rounded-xl">
      <div className="flex justify-between m-3">
        <div className="text-center text-2xl font-bold">
          Expenses - {budget?.name}
        </div>
        <button onClick={handleClose}>x</button>
      </div>
      {displayedExpenses.map((expense: expenseProps) => {
        return (
          <ul className="flex justify-between align-middle m-3" key={expense.id}>
            <div>{expense.name}</div>
            <div>{expense.description}</div>
            <div>
              {expense.amount}{" "}
              <button onClick={() => deleteExpense(expense)}>
                x
              </button>
            </div>{" "}
          </ul>
        );
      })}
    </div>
  );
}
