import { pgTable, varchar, serial, integer, numeric } from "drizzle-orm/pg-core";

export const budgetCategory = pgTable("budget_category", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
});


export const expenseCategory = pgTable("expense_category", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    budgetId: integer(),
  });
  
  export const budgets = pgTable("budgets", {
    id: integer(),
    name: varchar( { length: 255 }).notNull(),
    max: numeric( {precision:10, scale:2, mode:'number'}),
  });
  
  export const expenses = pgTable("expenses", {
      id: integer(),
      name: varchar( { length: 255 }).notNull(),
      description: varchar( { length: 255 }).notNull(),  
      amount: numeric( {precision:10, scale:2, mode:'number'}),
      budgetId: integer()
    });
  