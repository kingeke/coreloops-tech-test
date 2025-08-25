import { PokemonRepository } from '@coreloops-orm/pokemons/pokemon.repository';
import { Controller, Get } from '@nestjs/common';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonRepo: PokemonRepository) {}
  @Get('get')
  public async get() {
    return this.pokemonRepo.getAllPokemon();
  }
}
