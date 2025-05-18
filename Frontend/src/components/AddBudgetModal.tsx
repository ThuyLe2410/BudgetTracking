

import { useForm } from "react-hook-form";
import { useBudgets } from "../contexts/BudgetContext";
import type { AddBudgetModalProps, BudgetFormInput } from "../types";

export default function AddBudgetModal({
  show,
  handleClose,
}: AddBudgetModalProps) {
  const { register, handleSubmit, reset } = useForm<BudgetFormInput>();
  const { addBudget } = useBudgets() as {
    addBudget: (data: BudgetFormInput) => void;
  };

  const onSubmit = (data: BudgetFormInput) => {
    addBudget({ name: data.name, max: Number(data.maxSpending) });
    reset();
    handleClose();
  };

  if (!show) return null;

  return (
    <>
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50 w-full  max-w-lg border-1 border-b-gray-200 bg-white rounded-xl">
        <form className="m-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <div className="text-center text-2xl font-bold"> New Budget</div>
            <button onClick={handleClose}>x</button>
          </div>

          <p className="mt-3">Name</p>
          <input
            className="w-full h-10 border-1 p-1"
            {...register("name", { required: true })}
          />

          <p className="mt-3">Maximum spending</p>
          <input
            className="w-full h-10 border-1 p-1"
            {...register("maxSpending", { required: true })}
          />
          <div className="flex justify-end mt-3">
          <button
            className="bg-green-600 rounded"
            type="submit">
            Add
          </button>
          </div>


        </form>
      </div>
    </>
  );
}
