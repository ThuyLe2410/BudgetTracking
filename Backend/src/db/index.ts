import 'dotenv/config';
import {drizzle} from "drizzle-orm/node-postgres";
import {sql} from "drizzle-orm"
import { budgetCategory, expenseCategory } from './schema';

const db = drizzle(process.env.DATABASE_URL!)

async function main() {
    await db.execute(sql`TRUNCATE TABLE ${budgetCategory}`);
    await db.execute(sql`TRUNCATE TABLE ${expenseCategory}`);

    const budget_category = [
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
        { name: "Groceries", budgetId: 1 },
        { name: "Bars & Coffee", budgetId: 1 },
        { name: "Restaurant", budgetId: 1 },
        { name: "Breakfast", budgetId: 1 },
        { name: "Dinner", budgetId: 1 },
        { name: "Lunch", budgetId: 1 },
        { name: "Electricity", budgetId: 2 },
        { name: "Internet", budgetId: 2 },
        { name: "Mobile Phone", budgetId: 2 },
        { name: "Water", budgetId: 2 },
        { name: "Cable TV", budgetId: 2 },
        { name: "Gas", budgetId: 2 },
        { name: "Telephone", budgetId: 2 },
        { name: "Fuel", budgetId: 3 },
        { name: "Insurance", budgetId: 3 },
        { name: "Parking", budgetId: 3 },
        { name: "Service & Parts", budgetId: 3 },
        { name: "Taxi", budgetId: 3 },
        { name: "Pulic Transportation", budgetId: 3 },
        { name: "Clothes", budgetId: 4 },
        { name: "Accessories", budgetId: 4 },
        { name: "Shoes", budgetId: 4 },
        { name: "Recreation & Leisure", budgetId: 5 },
        { name: "Movies", budgetId: 5 },
        { name: "Shoes", budgetId: 5 },
        { name: "Tuition", budgetId: 6 },
        { name: "Babysitter & Daycare", budgetId: 6 },
        { name: "Baby Supplies", budgetId: 6 },
        { name: "Toys", budgetId: 6 },
        { name: "Gifts", budgetId: 7 },
        { name: "Donations", budgetId: 7 },
        { name: "Healthcare", budgetId: 8 },
        { name: "Health insurance", budgetId: 8 },
        { name: "Pharmacy", budgetId: 8 },
        { name: "Sports", budgetId: 8 },
        { name: "Furnishing", budgetId: 9 },
        { name: "Home services", budgetId: 9 },
        { name: "Mortgage & Rent", budgetId: 9 },
        { name: "Education", budgetId: 10 },
        { name: "Networking Expenses", budgetId: 10 },
        { name: "Spa & Massage", budgetId: 10 },
        { name: "Pet foods", budgetId: 11 },
        { name: "Pet Stuff", budgetId: 11 },
      ];

    await db.insert(budgetCategory).values(budget_category);
    console.log("New budget category created")

    await db.insert(expenseCategory).values(expense_category);
    console.log("New expense_category created");


}

main();