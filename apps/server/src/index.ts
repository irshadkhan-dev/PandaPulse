import { Hono } from 'hono';
import { Env } from './types';

const app = new Hono<{ Bindings: Env }>();

const { setupRoutes } = await import('./route');
setupRoutes(app);

export default app;
