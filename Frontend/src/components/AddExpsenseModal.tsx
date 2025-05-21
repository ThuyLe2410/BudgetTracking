import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import type {
  ExpenseFormInput,
  AddExpenseModalProps,
  budgetProps,
  expenseCategoryProps,
} from "../types";
import { useBudgets } from "../contexts/BudgetContext";

export default function AddExpsenseModal({
  show,
  handleClose,
  defaultBudgetId,
}: AddExpenseModalProps) {
  const { register, handleSubmit, reset } = useForm<ExpenseFormInput>({
    defaultValues: { budgetId: defaultBudgetId },
  });
  const { addExpense, budgets, expenseCategory } = useBudgets() as {
    addExpense: (data: {
      description: string;
      amount: number;
      budgetId: number;
    }) => void;
    budgets: budgetProps[];
    expenseCategory: expenseCategoryProps[];
  };

  const [selectingBudgetId, setSelectingBudgetId] = useState<number>();

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
    if (defaultBudgetId !== undefined) {
      reset({ budgetId: defaultBudgetId });
      setSelectingBudgetId(defaultBudgetId);
    } else if (budgets.length > 0) {
      setSelectingBudgetId(budgets[0].id);
    }
  }, [defaultBudgetId, reset, budgets]);

  if (!show) return null;
  console.log("expenseCategory", expenseCategory);
  console.log("selectingBudgetId", selectingBudgetId);

  return (
    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50 w-full  max-w-lg border-1 border-b-gray-200 bg-white rounded-xl">
      <form className="m-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <div className="text-center text-2xl font-bold">New Expense</div>
          <button onClick={handleClose}>x</button>
        </div>

        <p className="mt-3">Budget</p>
        <select
          className="w-full h-10 border-1 p-1"
          {...register("budgetId", { required: true })}
          onChange={(e) => setSelectingBudgetId(Number(e.target.value))}>
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

        <p className="mt-3">Expense Type</p>
        <select
          className="w-full h-10 border-1 p-1"
          {...register("expense", { required: true })}>
          {expenseCategory
            .filter(
              (e: expenseCategoryProps) =>
                Number(e.budgetId) === Number(selectingBudgetId)
            )
            .map((expense: expenseCategoryProps) => (
              <option key={expense.id}>{expense.name}</option>
            ))}
        </select>

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

        <div className="flex justify-end mt-3">
          <button className="bg-green-600 rounded" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
