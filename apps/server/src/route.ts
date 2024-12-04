import { Hono } from 'hono';
import type { Env } from './types';
import { and, eq, AnyColumn, sql as Sql } from 'drizzle-orm';
import ValidateApiKey from './middleware';

export function setupRoutes(app: Hono<{ Bindings: Env }>) {
	app.get('/database', ValidateApiKey, async (c) => {
		try {
			const { neon } = await import('@neondatabase/serverless');
			const { drizzle } = await import('drizzle-orm/neon-http');
			const { apikey, categories, events } = await import('@repo/db/schema');

			const sql = neon(c.env.DATABASE_URL);
			const db = drizzle(sql, {
				schema: {
					apikey,
					categories,
					events,
				},
			});

			const validateApiKey = c.get('validateApiKey');

			const { category, fields } = await c.req.json();

			const cat = await db.query.categories.findFirst({
				where: (categories, { eq }) => eq(categories.name, category),
			});

			const createEvent = await db.insert(events).values([
				{
					name: category,
					fields: {
						...fields,
					},
					userId: cat!.userId,
					categoryId: cat!.id,
				},
			]);

			console.log(createEvent);

			return c.json(createEvent);
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
