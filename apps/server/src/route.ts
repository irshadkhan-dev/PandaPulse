import { Hono } from 'hono';
import type { Env } from './types';

export function setupRoutes(app: Hono<{ Bindings: Env }>) {
	app.get('/database', async (c) => {
		try {
			const { neon } = await import('@neondatabase/serverless');
			const { drizzle } = await import('drizzle-orm/neon-http');
			const { users } = await import('@repo/db/schema');

			const sql = neon(c.env.DATABASE_URL);
			const db = drizzle(sql);
			const result = await db.select().from(users);
			return c.json({ result });
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
