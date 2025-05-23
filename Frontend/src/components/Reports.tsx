import { useNavigate } from "react-router-dom";

import { useBudgets } from "../contexts/BudgetContext";
import type { budgetProps, expenseProps, spendingByBudgetType } from "../types";
import BudgetvsSpending from "./ReportCharts/BudgetvsSpending";


export default function Reports() {
  const navigate = useNavigate();
  const { budgets, expenses } = useBudgets() as {
    budgets: budgetProps[];
    expenses: expenseProps[];
  };

  const spendingByBudget: spendingByBudgetType[] = budgets.map((budget) => {
    const spending = expenses
      .filter((expense) => Number(expense.budgetId) === Number(budget.id))
      .reduce((total, expense) => total + expense.amount, 0);
    return {
      budgetName: budget.name,
      budgetMax: budget.max,
      spendingAmount: spending,
    };
  });
  return (
    <div>
      <header className="flex w-full justify-between">
        <h1>Budgets Report </h1>
        <button onClick={() => navigate("/")}>Back</button>
      </header>
      <BudgetvsSpending data={spendingByBudget}/>
     
    </div>
  );
}
