import { pgTable, text } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { v4 as uuid } from "uuid";
import type { AdapterAccountType } from "next-auth/adapters";

export const generateUniqueString = (length: number = 12): string => {
  let uniqueString = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    uniqueString += characters[randomIndex];
  }

  return uniqueString;
};

const users = pgTable("user", {
  id: t.text("id").primaryKey().default(uuid()),
  email: t.text("email").unique().notNull(),
  name: t.text("name").notNull(),
  plan: t.text("plan").notNull().default("free"),
  discordId: t.text("discordId"),
  emailVerified: t.timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: t.timestamp().defaultNow().notNull(),
});

const accounts = pgTable("account", {
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccountType>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: t.integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const delivery = t.pgEnum("delivery", [
  "PENDING",
  "DELIVERED",
  "FAILED",
]);

const categories = pgTable("category", {
  id: t
    .text("id")
    .primaryKey()
    .$default(() => generateUniqueString(12)),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: t.text("name").notNull(),

  createdAt: t.timestamp("createdAt").notNull().defaultNow(),
  updatedAt: t.timestamp("updatedAt").notNull().defaultNow(),
});

const events = pgTable("events", {
  id: t
    .text("id")
    .primaryKey()
    .$default(() => generateUniqueString(12)),

  categoryId: t
    .text()
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),

  userId: t
    .text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  name: t.text("name").notNull(),
  deliveryStatus: delivery("deliveryStatus").notNull().default("PENDING"),
  fields: t.json("fields"),
  createdAt: t.timestamp("createdAt").notNull().defaultNow(),
  updatedAt: t.timestamp("updatedAt").notNull().defaultNow(),
});

const apikey = pgTable("apikey", {
  userId: t
    .text("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  hashedKey: t.text("hashedKey").notNull(),
  createdAt: t.timestamp("createdAt").defaultNow(),
  isActive: t.boolean("isActive").default(false),
});

const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: t.timestamp("expires", { mode: "date" }).notNull(),
});

export { users, accounts, sessions, categories, apikey, events };
