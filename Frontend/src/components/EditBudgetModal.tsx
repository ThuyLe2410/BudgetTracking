import {  useMemo, useRef } from "react";
import { useBudgets } from "../contexts/BudgetContext";
import type { EditBudgetModalProps, budgetProps } from "../types";

export default function EditBudgetModal({
  show,
  handleClose,
  editBudgetId,
}: EditBudgetModalProps) {
  const { budgets, editBudget } = useBudgets() as {
    budgets: budgetProps[];
    editBudget: (budget: budgetProps) => void;
  };

  const selectingBudget = useMemo(
    () => budgets.filter((b: budgetProps) => b.id === Number(editBudgetId)),
    [budgets, editBudgetId]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      editBudget({
        id: Number(editBudgetId),
        name: selectingBudget[0].name,
        max: Number(inputValue),
      });
    }
  };

  if (!show) return null;

  return (
    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50 w-full  max-w-lg border-1 border-b-gray-200 bg-white rounded-xl">
      <div className="flex justify-between m-3">
        <div className="text-center text-2xl font-bold"> Edit Budget - {selectingBudget[0]?.name}</div>
        <button onClick={handleClose}>x</button>
      </div>
      <div className="flex m-3">
        <p className="">Current Maximum spending:</p>
        <input
          className="ml-3 border-1 pl-2 h-9"
          value={selectingBudget[0]?.max}
        />
      </div>

      <div className="flex m-3">
        <p className="">Updated Maximum spending:</p>
        <input
          ref={inputRef}
          type="number"
          className="ml-3 border-1 p-1"
          placeholder="Enter new Maximum"
          defaultValue=""
        />
      </div>

      <div className="flex justify-end mt-3">
        <button className="bg-green-600 rounded" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
