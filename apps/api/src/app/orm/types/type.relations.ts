import { relations } from 'drizzle-orm';
import { typeEntity } from '@coreloops-orm/types/type.entity';
import { pokemonTypeEntity } from '@coreloops-orm/pokemon-types/pokemon-type.entity';

export const typeRelations = relations(typeEntity, ({ many }) => {
  return {
    pokemonTypes: many(pokemonTypeEntity, {
      relationName: 'pokemon_types_type',
    })
  }
})
