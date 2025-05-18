
import BudgetCard from './BudgetCard'
import { useBudgets } from '../contexts/BudgetContext'
import type { expenseProps, budgetProps } from '../types';

export default function TotalBudgetCard({onViewExpenseClick} :{onViewExpenseClick: () => void} ) {
  const {budgets, expenses} = useBudgets() as {
    budgets: budgetProps[],
    expenses: expenseProps[]
  };
  const amount = expenses.reduce((total:number , expense:expenseProps) => total + expense.amount, 0);
  const max = budgets.reduce((total:number, budget:budgetProps) => total + budget.max, 0)
  return (
    <BudgetCard amount= {amount} max={max} name="Total" onViewExpenseClick={onViewExpenseClick}/>
  )
}

