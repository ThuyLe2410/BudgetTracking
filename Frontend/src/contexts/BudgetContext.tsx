import React, { useContext } from "react";

import type {
  BudgetContextType,
  childrenProps,
  expenseProps,
  budgetProps,
} from "../types";
import {
  useBudgetQuery,
  useAddBudgetQuery,
  useDeleteBudgetQuery,
  useBudgetCategoryQuery,
  useEditBudgetQuery
} from "../hooks/use-budgets.tsx";
import {
  useExpenseQuery,
  useExpenseCategoryQuery,
  useAddExpenseQuery,
  useDeleteExpenseQuery,
} from "../hooks/use-expenses.tsx";

const BudgetContext = React.createContext<BudgetContextType | undefined>(
  undefined
);

export const TOTAL_BUDGET_ID = 0;
export const UNCATEGORIZED_BUDGET_ID = 1;
export function useBudgets() {
  return useContext(BudgetContext);
}

export const BudgetProvider = ({ children }: childrenProps) => {
  const { budgets } = useBudgetQuery();
  const { budgetCategory } = useBudgetCategoryQuery();
  const { expenses } = useExpenseQuery();
  const { expenseCategory } = useExpenseCategoryQuery();

  // BUDGETS
  // add new Budget
  const onAddBudget = useAddBudgetQuery();
  function addBudget({ id, name, max }: budgetProps) {
    if (
      budgets.find((budget: budgetProps) => Number(budget.id) === Number(id))
    ) {
      return budgets;
    }
    onAddBudget.mutate({ id, name, max });
  }

  // delete Budget (when delete Budget, we have to move all its expense to UnCategorized)
  const onDeleteBudget = useDeleteBudgetQuery();
  function deleteBudget(id: number) {
    onDeleteBudget.mutate(id);
  }

  // edit Budget
  const onEditBudget = useEditBudgetQuery()
  function editBudget(budget: budgetProps) {
    onEditBudget.mutate(budget)
  }


  // EXPENSES
  // add new Expense
  const onAddExpense = useAddExpenseQuery();
  function addExpense({
    description,
    amount,
    budgetId,
    expenseTypeId,
    name,
  }:Omit<expenseProps, "id">) {
    onAddExpense.mutate({ description, amount, budgetId, expenseTypeId, name });
  }

// delete Expense
  const onDeleteExpense = useDeleteExpenseQuery()
  function deleteExpense(expense: expenseProps) {
    onDeleteExpense.mutate(expense)

  }

  // get Total Expense by BudgetId
  function getBudgetExpense(budgetId: number) {
    return expenses.filter(
      (expense: expenseProps) => 
        Number(expense.budgetId) === Number(budgetId)
    );
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        budgetCategory,
        expenses,
        expenseCategory,
        getBudgetExpense,
        addExpense,
        addBudget,
        deleteBudget,
        editBudget,
        deleteExpense,
      }}>
      {children}
    </BudgetContext.Provider>
  );
};
