import { DrizzleProvider } from '@coreloops-orm/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonRepository {
  constructor(private readonly drizzle: DrizzleProvider) {}

  async getAllPokemon() {
    return this.drizzle.db.query.pokemonEntity.findMany();
  }
}
