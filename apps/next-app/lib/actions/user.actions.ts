"use server";
import db from "@repo/db";
import { categories } from "@repo/db/schema";
import { auth } from "../../auth";
import { eq } from "drizzle-orm";

const session = await auth();
const userId = session?.user.id;
export const CreateQuickStartCategory = async () => {
  try {
    const categoryTable = await db.insert(categories).values([
      {
        categoryName: "sale",
        userId,
      },
      {
        categoryName: "signup",
        userId,
      },
    ]);

    if (!categoryTable) {
      return { error: "Error creating events!" };
    }

    return { success: "Created events" };
  } catch (error) {
    console.log(error);
  }
};

export const GetAllCategory = async () => {
  try {
    const categoryTable: CategoryTableProps[] =
      await db.query.categories.findMany({
        where: (categories, { eq }) => eq(categories.userId, userId),
      });

    if (!categoryTable) return { error: "Error retriving the events." };

    return { categoryTable };
  } catch (error) {
    console.log(error);
  }
};

export const DeleteCategory = async (categoryId: string) => {
  try {
    const deleteCategory = await db
      .delete(categories)
      .where(eq(categories.categoryId, categoryId));

    if (deleteCategory) {
      return { success: "Event Category Deleted Successfully" };
    }
  } catch (error) {
    console.log(error);
  }
};
