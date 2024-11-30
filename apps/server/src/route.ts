import { Hono } from 'hono';
import type { Env } from './types';
import { and, eq } from 'drizzle-orm';

export function setupRoutes(app: Hono<{ Bindings: Env }>) {
	app.get('/database', async (c) => {
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

			const headerKey = c.req.header();
			const authorization = headerKey?.authorization;

			if (!authorization) {
				return c.json({ error: 'API key is required' }, 400);
			}

			const rawApi = authorization.split(' ')[1];

			const encoder = new TextEncoder();
			const data = encoder.encode(rawApi);
			const hashBuffer = await crypto.subtle.digest('SHA-256', data);

			const hashArray = Array.from(new Uint8Array(hashBuffer));
			const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

			const validateApiKey = await db.query.apikey.findFirst({
				where: (apikey, { eq }) => eq(apikey.hashedKey, hashHex),
			});

			console.log(validateApiKey);

			if (!validateApiKey) return c.json({ error: 'Error' });

			const { category, fields } = await c.req.json();
			console.log(category);

			const { plan, ...other } = fields;

			const updateCategory = await db
				.update(categories)
				.set({
					...other,
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
