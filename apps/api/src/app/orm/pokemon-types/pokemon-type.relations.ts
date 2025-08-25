import { relations } from 'drizzle-orm';
import { pokemonTypeEntity } from '@coreloops-orm/pokemon-types/pokemon-type.entity';
import { pokemonEntity } from '@coreloops-orm/pokemons/pokemon.entity';
import { typeEntity } from '@coreloops-orm/types/type.entity';

export const pokemonTypeRelations = relations(pokemonTypeEntity, ({ one }) => {
  return {
    pokemon: one(pokemonEntity, {
      fields: [pokemonTypeEntity.pokemonId],
      references: [pokemonEntity.id],
      relationName: 'pokemon_types_pokemon',
    }),
    type: one(typeEntity, {
      fields: [pokemonTypeEntity.typeId],
      references: [typeEntity.id],
      relationName: 'pokemon_types_type',
    })
  }
})
