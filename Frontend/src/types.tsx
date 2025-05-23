export type AddBudgetModalProps = {
  show: boolean;
  handleClose: () => void;
};

export type EditBudgetModalProps = {
  show: boolean;
  handleClose: () => void;
  editBudgetId: number | undefined
};

export type BudgetFormInput = {
  id: string;
  maxSpending: number;
};

export type TypeBudgetCard = {
  name: string;
  amount: number;
  max?: number;
  onDeleteBudget?: () => void;
  onEditBudget?: () => void;
  onAddExpenseClick?: () => void;
  onViewExpenseClick?: () => void;
};

export type BudgetContextType = {
  budgets: budgetProps[];
  budgetCategory: budgetCategoryProps[];
  expenses: expenseProps[];
  expenseCategory: expenseCategoryProps[];
  getBudgetExpense: (budgetId: number) => expenseProps[];
  addExpense: (expense: Omit<expenseProps, "id">) => void;
  addBudget: (budget: budgetProps) => void;
  deleteBudget: (id: number) => void;
  editBudget:(budget: budgetProps) => void;
  deleteExpense: (expenseProps: expenseProps) => void;
};

export type childrenProps = { children: React.ReactNode };

export type expenseProps = {
  id: number;
  description: string;
  amount: number;
  budgetId: number;
  expenseTypeId: number;
  name: string;
};

export type budgetProps = {
  id: number;
  name: string;
  max: number;
};

export type budgetCategoryProps = {
  id: number;
  name: string;
};

export type expenseCategoryProps = {
  id: number;
  name: string;
  budgetId: number;
};

export type AddExpenseModalProps = {
  show: boolean;
  handleClose: () => void;
  defaultBudgetId: number | undefined;
};

export type ExpenseFormInput = {
  description: string;
  amount: number;
  budgetId: number;
  expenseTypeId: number;
  name: string;
};

export type spendingByBudgetType = {
  budgetName: string,
  budgetMax: number;
  spendingAmount: number
}
