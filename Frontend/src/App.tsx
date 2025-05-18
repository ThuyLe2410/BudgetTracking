import "./App.css";
import BudgetCard from "./components/BudgetCard";
import { useState } from "react";
import AddBudgetModal from "./components/AddBudgetModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";
import type { budgetProps, expenseProps } from "./types";
import AddExpsenseModal from "./components/AddExpsenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpenseModal from "./components/ViewExpenseModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] =
    useState<string|undefined>();
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] =
    useState<string|null>(null);

  const { budgets, expenses, getBudgetExpense, deleteBudget } =
    useBudgets() as {
        budgets: budgetProps[],
        expenses: expenseProps[],
        getBudgetExpense: (budgetId:string|null) => expenseProps[],
        deleteBudget: (id:string) => void
    };

  console.log("budgets", budgets);
  console.log("expenses", expenses);

  function openAddExpenseModal(budgetId: string|undefined) {
    setAddExpenseModalBudgetId(budgetId);
    setShowAddExpenseModal(true);
  }


  return (
    <div className="flex flex-col mt-5 w-full">
      <header className="flex w-full justify-between">
        <h1>Budgets</h1>
        <div className="flex">
          <button onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </button>
          <button onClick={() => openAddExpenseModal(undefined)}>Add Expense</button>
        </div>
      </header>

      <div>
        {budgets.map((budget: budgetProps) => {
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
              onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}
            />
          );
        })}
        <UncategorizedBudgetCard
          onViewExpenseClick={() => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          onAddExpenseClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
        />
        <TotalBudgetCard onViewExpenseClick={() => setViewExpenseModalBudgetId("Total")}/>
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
