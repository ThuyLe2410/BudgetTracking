import { useNavigate } from "react-router-dom";

import { useBudgets } from "../contexts/BudgetContext";
import type {
  budgetProps,
  expenseProps,
  totalSpendingByBudgetProps,
  spendingByBudgetProps,
} from "../types";
import BudgetvsSpending from "./ReportCharts/BudgetvsSpending";
import SpendingByBudgetType from "./ReportCharts/SpendingByBudget";

export default function Reports() {
  const navigate = useNavigate();
  const { budgets, expenses } = useBudgets() as {
    budgets: budgetProps[];
    expenses: expenseProps[];
  };

  const totalSpendingByBudget: totalSpendingByBudgetProps[] = budgets.map(
    (budget) => {
      const spending = expenses
        .filter((expense) => Number(expense.budgetId) === Number(budget.id))
        .reduce((total, expense) => total + expense.amount, 0);
      return {
        budgetName: budget.name,
        budgetMax: budget.max,
        spendingAmount: spending,
      };
    }
  );

  const spendingByBudget: Record<string, spendingByBudgetProps> =
    expenses.reduce((acc, expense: expenseProps) => {
      const key =
        budgets.find((budget) => expense.budgetId === budget.id)?.name ?? "";
      console.log("key", key);

      if (!acc[key]) {
        acc[key] = {
          amount: 0,
          items: [],
        };
      }
      acc[key].amount += expense.amount;
      const existingItem = acc[key].items.find(
        (item) => item.expenseName === expense.name
      );
      if (existingItem) {
        existingItem.amount += expense.amount;
      } else {
        acc[key].items.push({
          expenseName: expense.name,
          amount: expense.amount,
        });
      }

      if (!acc["Total"]) {
        acc["Total"] = {
          amount: 0,
          items: [],
        };
      }
      acc["Total"].amount += expense.amount;
      const existingTotalItem = acc["Total"].items.find(
        (item) => item.expenseName === expense.name
      );
      if (existingTotalItem) {
        existingTotalItem.amount += expense.amount;
      } else {
        acc["Total"].items.push({
          expenseName: expense.name,
          amount: expense.amount,
        });
      }

      return acc;
    }, {} as Record<string, spendingByBudgetProps>);

  console.log("spendingByBudget", spendingByBudget);

  return (
    <div>
      <header className="flex w-full justify-between">
        <h1>Budgets Report </h1>
        <button onClick={() => navigate("/")}>Back</button>
      </header>
      <BudgetvsSpending data={totalSpendingByBudget} />
      <SpendingByBudgetType data={spendingByBudget} />
    </div>
  );
}
