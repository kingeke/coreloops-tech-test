CREATE TABLE "pokemon_moves" (
	"pokemon_id" uuid NOT NULL,
	"move_id" uuid NOT NULL,
	"level" integer,
	CONSTRAINT "pokemon_moves_move_id_pokemon_id_pk" PRIMARY KEY("move_id","pokemon_id")
);
--> statement-breakpoint
ALTER TABLE "pokemon_moves" ADD CONSTRAINT "pokemon_moves_pokemon_id_pokemons_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pokemon_moves" ADD CONSTRAINT "pokemon_moves_move_id_moves_id_fk" FOREIGN KEY ("move_id") REFERENCES "public"."moves"("id") ON DELETE no action ON UPDATE no action;