import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBudgetQuery, addBudgetQuery, deleteBudgetQuery } from "../services/budget";
import type { budgetProps } from "../types";

// fetch Budget
export function useBudgetQuery() {
    const {data, isLoading, error} = useQuery({
        queryKey:["budgets"],
        queryFn: fetchBudgetQuery,
        staleTime: 5000,
    })
    return {
        budgets: data || [],
        isLoading,
        error
    }
}

// add Budget

export function useAddBudgetQuery() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newBudget:budgetProps) => {
            return addBudgetQuery(newBudget)
        },

        onSuccess: () => queryClient.invalidateQueries({queryKey:["budgets"]}),

        onMutate: async (newBudget) => {
            await queryClient.cancelQueries({queryKey:["budgets"]})
            const prevBudgets = queryClient.getQueriesData({queryKey:["budgets"]});
            queryClient.setQueriesData({queryKey:["budgets"]}, (old:[]) => [
                ...old,
                {
                    id: newBudget.id,
                    name: newBudget.name,
                    max: newBudget.max
                }
            ]);
            return {prevBudgets}
        },
        onError: (err, newBudget, context) => {
            queryClient.setQueryData(["budgets"], context?.prevBudgets)
        }
    })

}

// delete Budget

export function useDeleteBudgetQuery() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => {
            return deleteBudgetQuery(id)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["budgets"]}),

        onMutate: async(id:string) => {
            await queryClient.cancelQueries({queryKey: ["budgets"]});
            const prevBudgets = queryClient.getQueriesData({queryKey: ["budgets"]});
            queryClient.setQueriesData({queryKey: ["budgets"]}, (old:[]) => 
            old.filter((budget:budgetProps) => budget.id !== id));
            return {prevBudgets}
        },
        
        onError: (err, deleteBudget, context) => {
            queryClient.setQueryData(["budgets"], context?.prevBudgets)
        }
    })
}