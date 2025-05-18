
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import type {
  ExpenseFormInput,
  AddExpenseModalProps,
  budgetProps,
} from "../types";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";

export default function AddExpsenseModal({
  show,
  handleClose,
  defaultBudgetId,
}: AddExpenseModalProps) {
  const { register, handleSubmit, reset } = useForm<ExpenseFormInput>({
    defaultValues: { budgetId: defaultBudgetId },
  });
  const { addExpense, budgets } = useBudgets() as {
    addExpense: (data: {
      description: string;
      amount: number;
      budgetId: string;
    }) => void;
    budgets: budgetProps[];
  };

  const onSubmit = (data: ExpenseFormInput) => {
    addExpense({
      description: data.description,
      amount: Number(data.amount),
      budgetId: data.budgetId,
    });
    reset();
    handleClose();
  };

  useEffect(() => {
    reset({ budgetId: defaultBudgetId });
  }, [defaultBudgetId, reset]);

  if (!show) return null;
  console.log('defaultBudgetId', defaultBudgetId)

  return (
    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50 w-full  max-w-lg border-1 border-b-gray-200 bg-white rounded-xl">
      <form className="m-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <div className="text-center text-2xl font-bold">New Expense</div>
          <button onClick={handleClose}>x</button>
        </div>
        <p className="mt-3">Description</p>
        <input
          className="w-full h-10 border-1 p-1"
          {...register("description", { required: true })}
        />

        <p className="mt-3">Amount</p>
        <input
          className="w-full h-10 border-1 p-1"
          {...register("amount", { required: true })}
        />

        <p className="mt-3">Budget</p>
        <select
          className="w-full h-10 border-1 p-1"
          {...register("budgetId", { required: true })}>
          {(defaultBudgetId === UNCATEGORIZED_BUDGET_ID || defaultBudgetId === undefined) ?  (
            <option value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
          ): ("")}
          {(defaultBudgetId
            ? budgets.filter(
                (budget: budgetProps) => budget.id === defaultBudgetId
              )
            : budgets
          ).map((budget: budgetProps) => (
            <option key={budget.id} value={budget.id}>
              {budget.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end mt-3">
          <button className="bg-green-600 rounded" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
