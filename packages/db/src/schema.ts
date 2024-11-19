import { pgTable, serial, text, doublePrecision } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { v4 as uuid } from "uuid";
import type { AdapterAccountType } from "next-auth/adapters";

const users = pgTable("user", {
  id: t.text("id").primaryKey().default(uuid()),

  email: t.text("email").unique().notNull(),
  name: t.text("name").notNull(),
  plan: t.text("plan").default("free").notNull(),
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

const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: t.timestamp("expires", { mode: "date" }).notNull(),
});

export { users, accounts, sessions };
