import "./App.css";
import BudgetCard from "./components/BudgetCard";
import { useState } from "react";
import AddBudgetModal from "./components/AddBudgetModal";
import {
  TOTAL_BUDGET_ID,
  useBudgets,
  UNCATEGORIZED_BUDGET_ID,
} from "./contexts/BudgetContext";
import type { budgetProps, expenseProps } from "./types";
import AddExpsenseModal from "./components/AddExpsenseModal";
import ViewExpenseModal from "./components/ViewExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState<
    number | undefined
  >();
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState<
    number | null
  >(null);

  const { budgets, expenses, getBudgetExpense, deleteBudget } =
    useBudgets() as {
      budgets: budgetProps[];
      expenses: expenseProps[];
      getBudgetExpense: (budgetId: number | null) => expenseProps[];
      deleteBudget: (id: number) => void;
    };

  console.log("budgets", budgets);
  console.log("expenses", expenses);

  function openAddExpenseModal(budgetId: number | undefined) {
    setAddExpenseModalBudgetId(budgetId);
    setShowAddExpenseModal(true);
  }
  console.log("viewExpenseModalBudgetId", viewExpenseModalBudgetId);

  return (
    <div className="flex flex-col mt-5 w-full">
      <header className="flex w-full justify-between">
        <h1>Budgets</h1>
        <div className="flex">
          <button onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </button>
          <button onClick={() => openAddExpenseModal(undefined)}>
            Add Expense
          </button>
        </div>
      </header>

      <div>
        {budgets
          .filter((budget) => budget.id !== 1)
          .map((budget: budgetProps) => {
            const amount = getBudgetExpense(budget.id).reduce(
              (total: number, expense: expenseProps) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onDeleteBudget={() => deleteBudget(budget.id)}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() =>
                  setViewExpenseModalBudgetId(budget.id)
                }
              />
            );
          })}
        <UncategorizedBudgetCard
          onViewExpenseClick={() =>
            setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
          onAddExpenseClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
        />
        <TotalBudgetCard
          onViewExpenseClick={() =>
            setViewExpenseModalBudgetId(TOTAL_BUDGET_ID)
          }
        />
      </div>

      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpsenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      />

      <ViewExpenseModal
        budgetId={viewExpenseModalBudgetId}
        handleClose={() => setViewExpenseModalBudgetId(null)}
      />
    </div>
  );
}

export default App;
