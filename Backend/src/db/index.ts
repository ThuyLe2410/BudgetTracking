import 'dotenv/config';
import {drizzle} from "drizzle-orm/node-postgres";
import {sql} from "drizzle-orm"
import { budgetCategory, expenseCategory, budgets, expenses } from './schema';

export const db = drizzle(process.env.DATABASE_URL!)

async function main() {
    await db.execute(sql`TRUNCATE TABLE ${budgetCategory} RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE ${expenseCategory} RESTART IDENTITY CASCADE`);
    // await db.execute(sql`TRUNCATE TABLE ${budgets}`);
    // await db.execute(sql`TRUNCATE TABLE ${expenses}`)

    const budget_category = [
        {name: "Uncategorized"},
        { name: "Food & Dining" },
        { name: "Utilities" },
        { name: "Auto & Transport" },
        { name: "Clothing" },
        { name: "Entertainment" },
        { name: "Kids" },
        { name: "Gifts & Donations" },
        { name: "Health & Fitness" },
        { name: "Home" },
        { name: "Personal" },
        { name: "Pets" },
      ];
    
      const expense_category = [
        {name: "Uncategorized", budgetId: 1},
        { name: "Groceries", budgetId: 2 },
        { name: "Bars & Coffee", budgetId: 2 },
        { name: "Restaurant", budgetId: 2 },
        { name: "Breakfast", budgetId: 2 },
        { name: "Dinner", budgetId: 2 },
        { name: "Lunch", budgetId: 2 },
        { name: "Electricity", budgetId: 3 },
        { name: "Internet", budgetId: 3 },
        { name: "Mobile Phone", budgetId: 3 },
        { name: "Water", budgetId: 3 },
        { name: "Cable TV", budgetId: 3 },
        { name: "Gas", budgetId: 3 },
        { name: "Telephone", budgetId: 3 },
        { name: "Fuel", budgetId: 4 },
        { name: "Insurance", budgetId: 4 },
        { name: "Parking", budgetId: 4 },
        { name: "Service & Parts", budgetId: 4 },
        { name: "Taxi", budgetId: 4 },
        { name: "Pulic Transportation", budgetId: 4 },
        { name: "Clothes", budgetId: 5 },
        { name: "Accessories", budgetId: 5 },
        { name: "Shoes", budgetId: 5 },
        { name: "Recreation & Leisure", budgetId: 6 },
        { name: "Movies", budgetId: 6 },
        { name: "Shoes", budgetId: 6 },
        { name: "Tuition", budgetId: 7 },
        { name: "Babysitter & Daycare", budgetId: 7 },
        { name: "Baby Supplies", budgetId: 7 },
        { name: "Toys", budgetId: 7 },
        { name: "Gifts", budgetId: 8 },
        { name: "Donations", budgetId: 8 },
        { name: "Healthcare", budgetId: 9 },
        { name: "Health insurance", budgetId: 9 },
        { name: "Pharmacy", budgetId: 9 },
        { name: "Sports", budgetId: 9 },
        { name: "Furnishing", budgetId: 10 },
        { name: "Home services", budgetId: 10 },
        { name: "Mortgage & Rent", budgetId: 10 },
        { name: "Education", budgetId: 11 },
        { name: "Networking Expenses", budgetId: 11 },
        { name: "Spa & Massage", budgetId: 11 },
        { name: "Pet foods", budgetId: 12 },
        { name: "Pet Stuff", budgetId: 12 },
      ];

    await db.insert(budgetCategory).values(budget_category);
    console.log("New budget category created")

    await db.insert(expenseCategory).values(expense_category);
    console.log("New expense_category created");

}

main();