import { Hono } from 'hono';
import type { Env } from './types';
import { and, eq, AnyColumn, sql as Sql } from 'drizzle-orm';
import ValidateApiKey from './middleware';
import { DiscordClient } from './discord';

export function setupRoutes(app: Hono<{ Bindings: Env }>) {
	app.post('/api/v1/events', ValidateApiKey, async (c) => {
		try {
			const { neon } = await import('@neondatabase/serverless');
			const { drizzle } = await import('drizzle-orm/neon-http');
			const { apikey, categories, events, users } = await import('@irshadkhan-dev/pandapulse-db/schema');

			const sql = neon(c.env.DATABASE_URL);
			const db = drizzle(sql, {
				schema: {
					apikey,
					categories,
					events,
					users,
				},
			});

			const user = c.get('validatedUser');

			const discordUserId = user.discordId;

			if (!discordUserId) {
				return c.json({ msg: 'No Discord Id Provided' });
			}

			const { category, fields }: { category: string; fields: any } = await c.req.json();

			const cat = await db.query.categories.findFirst({
				where: (categories, { eq }) => and(eq(categories.name, category), eq(categories.userId, user!.id)),
			});

			if (!cat) {
				return c.json({ Error: 'No category found related to this category' });
			}

			const discordClient = new DiscordClient(c.env.DISCORD_BOT_TOKEN);
			const dmChannel = await discordClient.createDM(discordUserId);

			const field = Object.entries(fields).map(([key, value]) => ({
				name: key.charAt(0).toUpperCase() + key.slice(1),
				value: `${value}`,
				inline: true,
			}));

			const embed = {
				title: `🔔 ${category.charAt(0).toUpperCase() + category.slice(1)}`,
				description: `A new ${category} event has occured.`,
				timestamp: new Date().toISOString(),
				fields: field,
			};

			const createEvent = await db
				.insert(events)
				.values([
					{
						name: category,
						fields: {
							...fields,
						},
						userId: user.id,
						categoryId: cat!.id,
					},
				])
				.returning();

			try {
				await discordClient.sendEmbed(dmChannel.id, embed);
				await db
					.update(events)
					.set({
						deliveryStatus: 'DELIVERED',
					})
					.where(eq(events.id, createEvent[0].id));
			} catch (error) {
				await db
					.update(events)
					.set({
						deliveryStatus: 'FAILED',
					})
					.where(eq(events.id, createEvent[0].id));

				console.log(error);

				return c.json({ Message: 'Error processing event' });
			}

			return c.json({ message: 'Events processed successfully', eventId: createEvent[0].id });
		} catch (error) {
			return c.json(
				{
					message: 'Error',
				},
				500,
			);
		}
	});
}
