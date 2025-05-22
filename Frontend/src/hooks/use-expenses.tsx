import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchExpenseQuery,
  fetchExpenseCategoryQuery,
  addExpenseQuery,
  deleteExpenseQuery,
} from "../services/expense";
import type { budgetProps, expenseProps } from "../types";

// fetch expense
export function useExpenseQuery() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenseQuery,
    staleTime: 5000,
  });
  return {
    expenses: data || [],
    isLoading,
    error,
  };
}

// fetch expense categories

export function useExpenseCategoryQuery() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["expenseCategory"],
    queryFn: fetchExpenseCategoryQuery,
    staleTime: 5000,
  });
  return {
    expenseCategory: data || [],
    isLoading,
    error,
  };
}

// add Expense
export function useAddExpenseQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newExpense: Omit<expenseProps, "id">) => {
      console.log("add new Expense", newExpense);
      return addExpenseQuery(newExpense);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expenses"] }),
    onMutate: async (newExpense) => {
      await queryClient.cancelQueries({ queryKey: ["expenses"] });
      const prevExpenses = queryClient.getQueriesData({
        queryKey: ["expenses"],
      });
      queryClient.setQueriesData({ queryKey: ["expenses"] }, (old: []) => [
        ...old,
        {
          expenseTypeId: newExpense.expenseTypeId,
          name: newExpense.name,
          description: newExpense.description,
          amount: newExpense.amount,
          budgetId: newExpense.budgetId,
        },
      ]);
      return { prevExpenses };
    },
    onError: (err, newExpense, context) => {
      queryClient.setQueryData(["expenses"], context?.prevExpenses);
    },
  });
}

// delete Expense
export function useDeleteExpenseQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (expense: expenseProps) => {
      return deleteExpenseQuery(expense);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onMutate: async (expense: expenseProps) => {
      await queryClient.cancelQueries({ queryKey: ["expenses"] });
      await queryClient.cancelQueries({ queryKey: ["budgets"] });

      const prevExpenses = queryClient.getQueryData(["expenses"]);
      const prevBudgets = queryClient.getQueryData(["budgets"]);

      queryClient.setQueryData(["expenses"], (old: []) =>
        old.filter((e: expenseProps) => e.id !== expense.id)
      );
      if (expense.budgetId === 1) {
        queryClient.setQueryData(["budgets"], (old: []) => {
          return old.map((b: budgetProps) => {
            if (Number(b.id) === 1) {
              return { ...b, max: Number(b.max) - Number(expense.amount) };
            }
            return b;
          });
        });
      }

      return { prevExpenses, prevBudgets };
    },
    onError: (err, deleteExpense, context) => {
      queryClient.setQueryData(["budgets"], context?.prevBudgets);
      queryClient.setQueryData(["expenses"], context?.prevExpenses);
    },
  });
}
