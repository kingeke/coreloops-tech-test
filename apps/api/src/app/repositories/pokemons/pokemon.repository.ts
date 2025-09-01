import { UserStore } from '@coreloops-api/shared/contexts';
import { PokemonSelectEntity } from '@coreloops-orm/schemas/pokemons/pokemon.types';
import { BaseRepository } from '@coreloops-repos/base.repository';
import { DrizzleProvider, pokemonEntity } from '@coreloops/data-access-layer';
import { CursorQueryDto } from '@coreloops/shared-types';
import { Injectable } from '@nestjs/common';
import { asc, eq, gt } from 'drizzle-orm';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class PokemonRepository extends BaseRepository {
  readonly table = pokemonEntity;
  constructor(
    protected readonly drizzle: DrizzleProvider,
    protected readonly cls: ClsService<UserStore>,
  ) {
    super(drizzle, cls);
  }

  async findMultiplePokemon({
    afterId,
    limit = 10,
  }: CursorQueryDto): Promise<{ hasNextPage: boolean; entities: PokemonSelectEntity[] }> {
    const where = afterId ? gt(this.table.pokedexNumber, Number(afterId)) : undefined;

    const rows = await this.drizzle.db.query.pokemonEntity.findMany({
      where,
      orderBy: [asc(this.table.pokedexNumber)],
      limit: limit + 1,
      with: {
        abilities: {
          with: {
            ability: true,
          },
        },
        types: {
          with: {
            type: true,
          },
        },
      },
    });

    const hasNextPage = rows.length > limit;
    const entities = hasNextPage ? rows.slice(0, limit) : rows;

    return {
      hasNextPage,
      entities,
    };
  }

  async findPokemonMoves(id: string): Promise<PokemonSelectEntity | undefined> {
    const where = eq(this.table.id, id);
    return await this.drizzle.db.query.pokemonEntity.findFirst({
      where,
      with: {
        moves: {
          with: {
            move: true,
          },
        },
      },
    });
  }

  async deletePokemon(id: string): Promise<{ message: string; status: string }> {
    await this.drizzle.db.delete(this.table).where(eq(this.table.id, id));

    return {
      message: `Pokemon ${id} deleted successfully`,
      status: 'success',
    };
  }
}
