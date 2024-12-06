import { Hono } from 'hono';
import { createMiddleware } from 'hono/factory';
import type { Env } from './types';
import { Context } from 'hono';
import { eq } from 'drizzle-orm';

declare module 'hono' {
	interface ContextVariableMap {
		validatedUser: {
			id: string;
			name: string;
			email: string;
			plan: string;
			discordId: string | null;
			emailVerified: Date | null;
			image: string | null;
			createdAt: Date;
		};
	}
}

const ValidateApiKey = createMiddleware<{ Bindings: Env }>(async (c, next) => {
	try {
		const { neon } = await import('@neondatabase/serverless');
		const { drizzle } = await import('drizzle-orm/neon-http');
		const { apikey, categories, users } = await import('@repo/db/schema');

		const sql = neon(c.env.DATABASE_URL);
		const db = drizzle(sql, {
			schema: {
				apikey,
				users,
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

		if (!validateApiKey) return c.json({ error: 'API key is invalid' });

		const validatedUser = await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.id, validateApiKey.userId),
		});

		if (!validatedUser) {
			return c.json({ error: 'No user with that API key! Generate new API key!' });
		}

		c.set('validatedUser', validatedUser);

		await next();
	} catch (error) {
		console.log(error);
	}
});

export default ValidateApiKey;
