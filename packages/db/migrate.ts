import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";

config({
  path: "../../apps/server/.dev.vars",
});

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "drizzle",
    });

    console.log("Migration Successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
