ALTER TABLE "reviews" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "author";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "text";