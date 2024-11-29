CREATE TABLE IF NOT EXISTS "category" (
	"categoryId" text,
	"userId" text NOT NULL,
	"categoryName" text NOT NULL,
	"lastPing" text DEFAULT 'NEVER',
	"amount" integer DEFAULT 0,
	"clientUserEmail" text,
	"events" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT 'ac053ccd-0cc8-4409-ab70-8d7cf4c0f5fe';