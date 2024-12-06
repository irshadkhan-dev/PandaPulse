"use server";
import db from "@repo/db";
import { categories, apikey, users, events } from "@repo/db/schema";
import { auth } from "../../auth";
import { and, eq } from "drizzle-orm";
import crypto from "crypto";
import { hashApiKey } from "lib/utils";

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
          name: c.categoryName,
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
    const categoryTable = await db.query.categories.findMany({
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
      .where(eq(categories.id, categoryId));
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (categoryId: string) => {
  try {
    const data = await db.query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.id, categoryId),
    });

    if (!data) return { error: "Error loading events try again!" };

    return { data };
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryByName = async (categoryName: string) => {
  try {
    return await db.query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.name, categoryName),
    });
  } catch (error) {
    console.log(error);
    return { error: "Error loading events" };
  }
};

export const CreateApiKey = async () => {
  try {
    await db.delete(apikey);

    const apiKey = crypto.randomBytes(32).toString("hex");

    const hashedKey = hashApiKey(apiKey);

    const storeHashKey = await db.insert(apikey).values([
      {
        hashedKey: hashedKey,
        isActive: true,
        userId: userId,
      },
    ]);

    if (storeHashKey) {
      return { apiKey };
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetAllEvents = async (eventName: string) => {
  try {
    return await db.query.events.findMany({
      where: (events, { eq }) =>
        and(eq(events.name, eventName), eq(events.userId, userId)),
    });
  } catch (error) {
    console.log(error);
  }
};

export const GetEvents = async () => {
  try {
    return await db.query.events.findMany({
      where: (events, { eq }) => eq(events.userId, userId),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async () => {
  const rawData = await db
    .select({
      user: users,
      category: categories,
      event: events,
    })
    .from(users)
    .leftJoin(categories, eq(categories.userId, users.id))
    .leftJoin(events, eq(events.userId, users.id));

  const groupedData = rawData.reduce((acc: any, row) => {
    const { user, category, event } = row;

    if (!acc[user.id]) {
      acc[user.id] = { ...user, categories: [], events: [] };
    }

    if (
      category &&
      !acc[user.id].categories.some((cat: any) => cat.id === category.id)
    ) {
      acc[user.id].categories.push(category);
    }

    if (event && !acc[user.id].events.some((ev: any) => ev.id === event.id)) {
      acc[user.id].events.push(event);
    }

    return acc;
  }, {});

  return Object.values(groupedData);
};

export const SaveDiscordId = async (discordId: string) => {
  try {
    await db
      .update(users)
      .set({
        discordId: discordId,
      })
      .where(eq(users.id, userId));
  } catch (error) {
    console.log(error);
  }
};
