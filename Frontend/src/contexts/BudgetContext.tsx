import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage.tsx";
import type { BudgetContextType, childrenProps, expenseProps, budgetProps } from "../types";
import { useBudgetQuery, useAddBudgetQuery, useDeleteBudgetQuery } from "../hooks/use-budgets.tsx";


const BudgetContext = React.createContext<BudgetContextType | undefined>(
  undefined
);

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetContext);
}


export const BudgetProvider = ({ children }: childrenProps) => {
  const {budgets, isLoading, error} = useBudgetQuery()
  // const [budgets, setBudgets] = useLocalStorage<budgetProps[]>("budgets", []);
  const [expenses, setExpenses] = useLocalStorage<expenseProps[]>("expenses", []);

  function getBudgetExpense(budgetId: string) {
    return expenses.filter(
      (expense: expenseProps) => expense.budgetId === budgetId
    );
  }

  function addExpense({
    description,
    amount,
    budgetId,
  }: Omit<expenseProps, "id">) {
    setExpenses((prevExpense: expenseProps[]) => {
      return [...prevExpense, { id: uuidV4(), description, amount, budgetId }];
    });
  }


  const onAddBudget = useAddBudgetQuery();

  function addBudget({ id, name, max }: budgetProps) {
    if (budgets.find((budget:budgetProps) => budget.id === id)) {
      return budgets
    }
    onAddBudget.mutate({id, name, max})
  }

  const onDeleteBudget = useDeleteBudgetQuery();

  function deleteBudget(id: string) {
    setExpenses((prevExpenses: expenseProps[]) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    onDeleteBudget.mutate(id)
  }

  function deleteExpense(id: string) {
    setExpenses((prevExpenses: expenseProps[]) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error...</p>


  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpense,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}>
      {children}
    </BudgetContext.Provider>
  );
};
