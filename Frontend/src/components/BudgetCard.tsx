import type { TypeBudgetCard } from "../types";

function currencyFormat(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function getProgressColorClass(ratio: number) {
  if (ratio < 0.5) return "progress-bar-blue";
  if (ratio < 0.8) return "progress-bar-orange";
  return "progress-bar-red";
}

export default function BudgetCard({
  name,
  amount,
  max,
  onDeleteBudget,
  onAddExpenseClick,
  onViewExpenseClick,
}: TypeBudgetCard) {
  const ratio = max ? Math.min(amount / max, 1) : 1;
  const progressColorClass = getProgressColorClass(ratio);

  return (
    <div className="relative flex flex-col h-auto  m-5 p-3 border border-gray-200 rounded-2xl items-center ">
      {name !== "Uncategorized" && name !== "Total" && (
        <div className="flex w-full justify-end ">
          <button
            className=" text-red-500 hover:text-red-700"
            onClick={onDeleteBudget}>
            X
          </button>
        </div>
      )}

      <div className="flex w-full justify-between m-2">
        <div>{name}</div>
        <div>
          {currencyFormat(amount)} {max && <span> /{currencyFormat(max)}</span>}
        </div>
      </div>
      {max && (
        <progress
          className={`flex w-full progress-bar ${progressColorClass}`}
          value={amount}
          max={max}
        />
      )}

      {name === "Total" ? (
        <div className="flex w-full justify-end gap-2.5 m-3">
          <button onClick={onViewExpenseClick}>View Expenses</button>
        </div>
      ) : (
        <div className="flex w-full justify-end gap-2.5 m-3">
          <button onClick={onAddExpenseClick}>Add Expenses</button>
          <button onClick={onViewExpenseClick}>View Expenses</button>
        </div>
      )}
    </div>
  );
}
