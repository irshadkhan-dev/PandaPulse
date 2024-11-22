"use server";
import db from "@repo/db";
import { categories } from "@repo/db/schema";
import { auth } from "../../auth";

export const CreateQuickStartCategory = async () => {
  const session = await auth();

  const userId = session?.user.id;

  try {
    const categoryTable: CategoryTableProps[] = await db
      .insert(categories)
      .values([
        {
          categoryName: "sale",
          userId,
        },
        {
          categoryName: "signup",
          userId,
        },
      ])
      .returning({
        categoryName: categories.categoryName,
        amount: categories.amount,
        events: categories.events,
        lastPing: categories.lastPing,
        clientUserEmail: categories.clientUserEmail,
      });

    if (!categoryTable) return null;

    return { categoryTable };
  } catch (error) {
    console.log(error);
  }
};
