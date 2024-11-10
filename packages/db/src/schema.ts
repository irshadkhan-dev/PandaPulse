import { pgTable, serial, text, doublePrecision } from "drizzle-orm/pg-core";

const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  price: doublePrecision("price"),
});

export { products };
