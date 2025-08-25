import { PokemonController } from '@coreloops-api/rest/controllers/pokemon/pokemon.controller';
import { RestServicesModule } from '@coreloops-api/rest/services/services.module';
import { PokemonModule } from '@coreloops-orm/pokemons/pokemon.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [PokemonController],
  imports: [RestServicesModule, PokemonModule],
})
export class ControllersModule {}
