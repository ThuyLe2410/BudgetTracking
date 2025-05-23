import type { budgetProps } from "../types";

// fetch budgets data Query
export async function fetchBudgetQuery() {
    const response = await fetch("http://localhost:3000/budgets", {
        headers: {
            "Content-Type": "application/json",
        }
    })
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const {data} = await response.json();
    return data
}

// fetch budget Category Query
export async function fetchBudgetCategoryQuery() {
    const response = await fetch("http://localhost:3000/budgetCategory", {
        headers: {
            "Content-Type": "application/json"
        }
    })
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const {data} = await response.json();
    return data
}

// add Budgets data Query
export async function addBudgetQuery({id, name, max}:budgetProps) {
    console.log('data',id, name, max );

    const response = await fetch("http://localhost:3000/budgets", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            name: name,
            max: max
        })
    })
    await new Promise((resolves) => setTimeout(resolves, 2000));
    const {data} = await response.json();
    console.log("add new Budget", data)
}


// delete Budgets data Query
export async function deleteBudgetQuery(id: number) {
    const response = await fetch(`http://localhost:3000/budgets/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    await new Promise((resolve)=> setTimeout(resolve, 2000))
    const res = await response.json()
    console.log(res)
}

// edit Budget Query
export async function editBudgetQuery(budget: budgetProps) {
    console.log('services budgets edit', budget)
    const response = await fetch(`http://localhost:3000/budgets/${budget.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: budget.id,
            max: Number(budget.max),
            name: budget.name
        })

    })
    const res = await response.json()
    console.log(res)
}



