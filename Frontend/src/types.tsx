
export type AddBudgetModalProps = {
    show: boolean;
    handleClose: () => void
}

export type BudgetFormInput = {
    name: string;
    maxSpending: number
}

export type TypeBudgetCard = {
    name: string;
    amount: number;
    max?: number;
    onDeleteBudget?:()=> void
    onAddExpenseClick?: () => void;
    onViewExpenseClick?: () => void
  };

export type BudgetContextType = {
    budgets: budgetProps[];
    expenses: expenseProps[];
    getBudgetExpense: (budgetId: string) => expenseProps[];
    addExpense: (expense: Omit<expenseProps, "id">) => void;
    addBudget: (budget: budgetProps) => void;
    deleteBudget: (id: string) => void;
    deleteExpense: (id: string) => void;
  };

export type childrenProps = { children: React.ReactNode };

export type expenseProps = {
    id: string;
    description: string;
    amount: number;
    budgetId: string;
  };

export type budgetProps = {
    id: string;
    name: string;
    max: number;
  };

export type AddExpenseModalProps = {
    show: boolean,
    handleClose: () => void,
    defaultBudgetId: string | undefined
}

export type ExpenseFormInput = {
    description: string,
    amount: number,
    budgetId:string
}
  