import {
  budgetCategory,
  budgets,
  expenseCategory,
  expenses,
} from "./src/db/schema";
import { db } from "./src/db/index";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

// fetch budgetCategory
app.get("/budgetCategory", async (req, res) => {
  const queryResult = await db.select().from(budgetCategory);
  res.send({ data: queryResult });
});

// fetch budgets Data
app.get("/budgets", async (req, res) => {
  const queryResult = await db.select().from(budgets);
  res.send({ data: queryResult });
});

// Add new budget
app.post("/budgets", async (req, res) => {
  const insertData = {
    name: req.body.name,
    max: req.body.max,
    id: req.body.id,
  };
  console.log("insertData", req.body);
  await db.insert(budgets).values(insertData);
  console.log("Add new budget");
});

// Delete budget
app.delete("/budgets/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const totalAmount = await db
    .select({ sum: sql<number>`SUM(${expenses.amount})` })
    .from(expenses)
    .where(eq(expenses.budgetId, id));
  const amount = totalAmount[0]?.sum ?? 0;
  console.log("amount", amount);
  const uncategorizedBudget = await db
    .select()
    .from(budgets)
    .where(eq(budgets.id, 1));
  let newMax: number;
  if (uncategorizedBudget.length > 0) {
    const uncategorized = uncategorizedBudget[0];
    newMax = Number(uncategorized.max ?? 0) + amount;
    console.log("newMax", newMax);
    await db.update(budgets).set({ max: newMax }).where(eq(budgets.id, 1));
    await db.delete(budgets).where(eq(budgets.id, id));
  } else {
    await db
      .update(budgets)
      .set({ id: 1, name: "Uncategorized", max: amount })
      .where(eq(budgets.id, id));
  }
  await db
    .update(expenses)
    .set({ expenseTypeId: 1, name: "Uncategorized", budgetId: 1 })
    .where(eq(expenses.budgetId, id));
});

// fetch expense
app.get("/expenses", async (req, res) => {
  const queryResult = await db.select().from(expenses);
  console.log('fetch expense', queryResult)
  res.send({ data: queryResult });
});

// fetch expense Category
app.get("/expenseCategory", async (req, res) => {
  const queryResult = await db.select().from(expenseCategory);
  res.send({ data: queryResult });
  console.log("expenseCategory");
});

// Add New Expense
app.post("/expenses", async (req, res) => {
  console.log("add new Expense", req.body);
  const name = await db
    .select({ name: expenseCategory.name })
    .from(expenseCategory)
    .where(eq(expenseCategory.id, req.body.expenseTypeId));
  const insertData = {
    expenseTypeId: req.body.expenseTypeId,
    name: name[0].name,
    description: req.body.description,
    amount: req.body.amount,
    budgetId: req.body.budgetId,
  };
  await db.insert(expenses).values(insertData);
});

// Delete Expense
app.delete("/expenses/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const budgetId = req.body.budgetId;
  let amount: Number;
  if (budgetId === 1) {
    amount = Number(req.body.amount);
    await db
      .update(budgets)
      .set({ max: Number(budgets.max) - Number(amount) })
      .where(eq(budgets.id, 1));
  }
  await db.delete(expenses).where(eq(expenses.id, id));
});

const run = async () => {
  app.listen(3000, () => {
    console.log("Server started!");
  });
};

run();
