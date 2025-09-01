import { pokemonEntity } from '@coreloops-orm/schemas';
import { moveEntity } from '@coreloops-orm/schemas/moves';
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

export const pokemonMoveEntity = pgTable(
  'pokemon_moves',
  {
    pokemonId: uuid('pokemon_id')
      .notNull()
      .references(() => pokemonEntity.id, { onDelete: 'cascade' }),
    moveId: uuid('move_id')
      .notNull()
      .references(() => moveEntity.id, { onDelete: 'cascade' }),
  },
  table => [primaryKey({ columns: [table.moveId, table.pokemonId] })],
);
