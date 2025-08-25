import { pokemonEntity } from '@coreloops-orm/pokemons/pokemon.entity';
import { typeEntity } from '@coreloops-orm/types/type.entity';
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

export const pokemonTypeEntity = pgTable(
  'pokemon_types',
  {
    pokemonId: uuid('pokemon_id')
      .notNull()
      .references(() => pokemonEntity.id),
    typeId: uuid('type_id')
      .notNull()
      .references(() => typeEntity.id),
  },
  table => [primaryKey({ columns: [table.typeId, table.pokemonId] })],
);
