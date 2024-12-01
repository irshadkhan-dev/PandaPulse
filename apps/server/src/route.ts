import { Hono } from 'hono';
import type { Env } from './types';
import { and, eq, AnyColumn, sql as Sql } from 'drizzle-orm';
import ValidateApiKey from './middleware';

export function setupRoutes(app: Hono<{ Bindings: Env }>) {
	app.get('/database', ValidateApiKey, async (c) => {
		try {
			const { neon } = await import('@neondatabase/serverless');
			const { drizzle } = await import('drizzle-orm/neon-http');
			const { apikey, categories } = await import('@repo/db/schema');

			const sql = neon(c.env.DATABASE_URL);
			const db = drizzle(sql, {
				schema: {
					apikey,
				},
			});

			const validateApiKey = c.get('validateApiKey');

			const { category, fields } = await c.req.json();

			const { plan, amount, ...other } = fields;
			console.log(amount);
			const updateCategory = await db
				.update(categories)
				.set({
					amount: Sql`${categories.amount} + ${amount}`,
					events: Sql`${categories.events} + 1`,
				})
				.where(and(eq(categories.categoryName, category), eq(categories.userId, validateApiKey.userId)));

			console.log(updateCategory);

			return c.json(true);
		} catch (error) {
			console.log(error);
			return c.json(
				{
					error,
				},
				400,
			);
		}
	});
}
