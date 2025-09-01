import { pokemonMoveEntity, type MoveSelectEntity } from '@coreloops-orm/schemas';

export type PokemonMoveSelectEntityBase = typeof pokemonMoveEntity.$inferSelect;
export type PokemonMoveSelectEntity = PokemonMoveSelectEntityBase & {
  move: MoveSelectEntity;
};
