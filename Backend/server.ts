import {budgetCategory, budgets, expenseCategory, expenses} from "./src/db/schema"
import {db} from "./src/db/index";
import {sql} from "drizzle-orm";
import {eq} from "drizzle-orm"

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "DELETE", "PUT"]
}))

// fetch budgetCategory
app.get("/budgetCategory", async(req, res) => {
    const queryResult = await db.select().from(budgetCategory);
    res.send({data:queryResult})
})

// fetch budgets Data
app.get("/budgets", async(req, res) => {
    const queryResult = await db.select().from(budgets);
    res.send({data: queryResult})
})

// Add new budget
app.post("/budgets", async(req, res) => {
    const insertData = {
        name: req.body.name,
        max: req.body.max,
        id: req.body.id
    }
    console.log('insertData', req.body)
    await db.insert(budgets).values(insertData);
    console.log("Add new budget")
})

// Delete budget
app.delete("/budgets/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const totalAmount = await db.select({sum: sql<number>`SUM(${expenses.amount})`}).from(expenses).where(eq(expenses.budgetId, id));
    const amount = totalAmount[0]?.sum ?? 0
    console.log("amount", amount);
    const uncategorizedBudget = await db.select().from(budgets).where(eq(budgets.id, 1));
    if (uncategorizedBudget.length>0) {
        const uncategorized = uncategorizedBudget[0];
        const newMax = Number(uncategorized.max ?? 0) + amount
    }
    await db.update(budgets).set({id: 1, name:"Uncategorized", max :amount}).where(eq(budgets.id, id));
    await db.update(expenses).set({budgetId:1}).where(eq(expenses.budgetId, id));
})

// fetch expense
app.get("/expenses", async (req, res) => {
    const queryResult = await db.select().from(expenses)
    res.send({data: queryResult})
})

// fetch expense Category
app.get("/expenseCategory", async (req, res) => {
    const queryResult = await db.select().from(expenseCategory)
    res.send({data:queryResult});
    console.log('expenseCategory')
})

const run = async () =>  {
    app.listen(3000, () => {
        console.log("Server started!")
    })
}



run()



