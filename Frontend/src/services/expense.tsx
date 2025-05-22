import type { expenseProps } from "../types";

// fetch Expenses
export async function fetchExpenseQuery() {
    const response = await fetch ("http://localhost:3000/expenses", {
        headers: {
            "Content-Type": "application/json"
        }
    })
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const {data} = await response.json();
    
    return data
}

// fetch Expense Category
export async function fetchExpenseCategoryQuery(){
    const response = await fetch("http://localhost:3000/expenseCategory", {
        headers: {
            "Content-Type": "application/json"
        }
    })
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const {data} = await response.json();
    return data
}

// add New Expenses
export async function addExpenseQuery({budgetId, expenseTypeId, description, amount} : Omit<expenseProps, "id">) {
    const response = await fetch("http://localhost:3000/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            budgetId: budgetId,
            expenseTypeId: expenseTypeId,
            description: description,
            amount: amount
        })
    })
    const {data} = await response.json();
    console.log('Add New Expense', data)
}

// delete Expense
export async function deleteExpenseQuery(expense: expenseProps) {
    const response = await fetch(`http://localhost:3000/expenses/${expense.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expense)
    });
    const res = await response.json();
    console.log(res)
}



