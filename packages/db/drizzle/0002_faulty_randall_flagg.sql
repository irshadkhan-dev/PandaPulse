ALTER TABLE "user" RENAME COLUMN "avatar" TO "emailVerified";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT 'ea9a7785-4e94-46b7-96b4-21e351d2d392';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "image" text;