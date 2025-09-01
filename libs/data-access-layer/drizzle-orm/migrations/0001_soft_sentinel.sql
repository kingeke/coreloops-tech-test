CREATE TABLE "moves" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"accuracy" integer,
	"damage_class" text,
	"power" integer,
	"pp" integer,
	"type_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "moves" ADD CONSTRAINT "moves_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."types"("id") ON DELETE no action ON UPDATE no action;