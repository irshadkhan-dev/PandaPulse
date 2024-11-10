import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({
  path: "../../apps/server/.dev.vars",
});

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql);

export default db;
