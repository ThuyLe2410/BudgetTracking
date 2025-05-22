import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchBudgetQuery,
  addBudgetQuery,
  deleteBudgetQuery,
  fetchBudgetCategoryQuery,
} from "../services/budget";
import type { budgetProps, expenseProps } from "../types";

// fetch Budget
export function useBudgetQuery() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["budgets"],
    queryFn: fetchBudgetQuery,
    staleTime: 5000,
  });
  return {
    budgets: data || [],
    isLoading,
    error,
  };
}

// fetch Budget category
export function useBudgetCategoryQuery() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["budgetCategory"],
    queryFn: fetchBudgetCategoryQuery,
    staleTime: 5000,
  });
  return {
    budgetCategory: data || [],
    isLoading,
    error,
  };
}

// add Budget
export function useAddBudgetQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newBudget: budgetProps) => {
      return addBudgetQuery(newBudget);
    },

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budgets"] }),

    onMutate: async (newBudget) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });
      const prevBudgets = queryClient.getQueriesData({ queryKey: ["budgets"] });
      queryClient.setQueriesData({ queryKey: ["budgets"] }, (old: []) => [
        ...old,
        {
          id: newBudget.id,
          name: newBudget.name,
          max: newBudget.max,
        },
      ]);
      return { prevBudgets };
    },
    onError: (err, newBudget, context) => {
      queryClient.setQueryData(["budgets"], context?.prevBudgets);
    },
  });
}

// delete Budget
export function useDeleteBudgetQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return deleteBudgetQuery(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });
      await queryClient.cancelQueries({ queryKey: ["expenses"] });

      const prevBudgets = queryClient.getQueryData(["budgets"]);
      const prevExpenses = queryClient.getQueryData(["expenses"]);

      queryClient.setQueryData(["budgets"], (old: []) =>
        old.filter((budget: budgetProps) => Number(budget.id) !== Number(id))
      );
      queryClient.setQueryData(
        ["expenses"],
        (old: expenseProps[]) => {
          return old.map((expense) => {
            if (Number(expense.budgetId) === Number(id)) {
                return {
                    ...expense,
                    budgetId: 1
                }
            }
            return expense;
          })
        }
      );
      console.log("prevExpense", prevExpenses);
      console.log('prevBudget', prevBudgets)

      return { prevBudgets, prevExpenses};
    },

    onError: (err, deleteBudget, context) => {
      queryClient.setQueryData(["budgets"], context?.prevBudgets);
      queryClient.setQueryData(["expenses"], context?.prevExpenses)
    },
  });
}
