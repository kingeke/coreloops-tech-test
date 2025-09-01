import { pokemonAbilityEntity, pokemonEntity, pokemonMoveEntity, pokemonTypeEntity } from '@coreloops-orm/schemas';
import { relations } from 'drizzle-orm';

export const pokemonRelations = relations(pokemonEntity, ({ many }) => {
  return {
    moves: many(pokemonMoveEntity, {
      relationName: 'pokemon_moves_pokemon',
    }),
    types: many(pokemonTypeEntity, {
      relationName: 'pokemon_types_pokemon',
    }),
    abilities: many(pokemonAbilityEntity, {
      relationName: 'pokemon_abilities_pokemon',
    }),
  };
});
