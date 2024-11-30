CREATE TABLE IF NOT EXISTS "apikey" (
	"userId" text NOT NULL,
	"hashedKey" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"isActive" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT '465f25a3-8884-49a2-84c3-5a1e459042bb';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "apikey" ADD CONSTRAINT "apikey_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
