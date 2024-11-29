"use server";
import db from "@repo/db";
import { categories } from "@repo/db/schema";
import { auth } from "../../auth";
import { eq } from "drizzle-orm";

const session = await auth();
const userId = session?.user.id;

export const CreateCategory = async (category: CreateCategoryType[]) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    for (const c of category) {
      const categoryTable = await db.insert(categories).values([
        {
          categoryName: c.categoryName,
          userId,
        },
      ]);
      if (!categoryTable) {
        throw new Error("Error creating events!");
      }
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
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (categoryId: string) => {
  try {
    const data = await db.query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.categoryId, categoryId),
    });

    if (!data) return { error: "Error loading events try again!" };

    return { data };
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryByName = async (categoryName: string) => {
  try {
    const data = await db.query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.categoryName, categoryName),
    });

    if (!data) return { error: "Error loading the events" };

    return { data };
  } catch (error) {
    console.log(error);
  }
};
