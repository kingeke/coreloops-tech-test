import { PokemonRepository } from '@coreloops-orm/pokemons/pokemon.repository';
import { Module } from '@nestjs/common';

@Module({
  exports: [PokemonRepository],
  providers: [PokemonRepository],
})
export class PokemonModule {}
