CREATE TABLE "review_translations" (
	"id" text PRIMARY KEY NOT NULL,
	"review_id" text NOT NULL,
	"locale" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "review_translation_review_locale_unique" UNIQUE("review_id","locale")
);
--> statement-breakpoint
ALTER TABLE "review_translations" ADD CONSTRAINT "review_translations_review_id_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "description";