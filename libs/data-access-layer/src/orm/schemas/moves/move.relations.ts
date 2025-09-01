import { moveEntity } from '@coreloops-orm/schemas/moves/move.entity';
import { pokemonMoveEntity } from '@coreloops-orm/schemas/pokemon-moves';
import { relations } from 'drizzle-orm';

export const moveRelations = relations(moveEntity, ({ many }) => {
  return {
    pokemonMoves: many(pokemonMoveEntity, {
      relationName: 'pokemon_moves_move',
    }),
  };
});
