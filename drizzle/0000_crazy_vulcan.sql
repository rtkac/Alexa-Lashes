CREATE TABLE "reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"author" text NOT NULL,
	"text" text NOT NULL,
	"rating" integer NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
