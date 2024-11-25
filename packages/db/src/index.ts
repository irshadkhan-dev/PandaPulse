import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema";

config({
  path: "../../apps/server/.dev.vars",
});

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema: schema });

export default db;
