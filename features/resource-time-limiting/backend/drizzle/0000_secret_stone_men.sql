CREATE TABLE "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"alt_text" varchar(512),
	"url" varchar(1024) NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"file_size" integer,
	"mime_type" varchar(50),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "time_limits" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "time_limits_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"image_id" uuid,
	"valid_till" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "time_limits" ADD CONSTRAINT "time_limits_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;