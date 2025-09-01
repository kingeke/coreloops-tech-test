ALTER TABLE "pokemon_abilities" DROP CONSTRAINT "pokemon_abilities_pokemon_id_pokemons_id_fk";
--> statement-breakpoint
ALTER TABLE "pokemon_abilities" DROP CONSTRAINT "pokemon_abilities_ability_id_abilities_id_fk";
--> statement-breakpoint
ALTER TABLE "pokemon_types" DROP CONSTRAINT "pokemon_types_pokemon_id_pokemons_id_fk";
--> statement-breakpoint
ALTER TABLE "pokemon_types" DROP CONSTRAINT "pokemon_types_type_id_types_id_fk";
--> statement-breakpoint
ALTER TABLE "pokemon_moves" DROP CONSTRAINT "pokemon_moves_pokemon_id_pokemons_id_fk";
--> statement-breakpoint
ALTER TABLE "pokemon_moves" DROP CONSTRAINT "pokemon_moves_move_id_moves_id_fk";
--> statement-breakpoint
ALTER TABLE "pokemon_abilities" ADD CONSTRAINT "pokemon_abilities_pokemon_id_pokemons_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pokemon_abilities" ADD CONSTRAINT "pokemon_abilities_ability_id_abilities_id_fk" FOREIGN KEY ("ability_id") REFERENCES "public"."abilities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pokemon_types" ADD CONSTRAINT "pokemon_types_pokemon_id_pokemons_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pokemon_types" ADD CONSTRAINT "pokemon_types_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pokemon_moves" ADD CONSTRAINT "pokemon_moves_pokemon_id_pokemons_id_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pokemon_moves" ADD CONSTRAINT "pokemon_moves_move_id_moves_id_fk" FOREIGN KEY ("move_id") REFERENCES "public"."moves"("id") ON DELETE cascade ON UPDATE no action;