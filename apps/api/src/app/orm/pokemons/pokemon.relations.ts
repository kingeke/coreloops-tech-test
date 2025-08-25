import { relations } from 'drizzle-orm';
import { pokemonEntity } from '@coreloops-orm/pokemons/pokemon.entity';
import { typeEntity } from '@coreloops-orm/types/type.entity';
import { abilityEntity } from '@coreloops-orm/abilities/ability.entity';
import { pokemonAbilityEntity } from '@coreloops-orm/pokemon-abilities/pokemon-ability.entity';
import { pokemonTypeEntity } from '@coreloops-orm/pokemon-types/pokemon-type.entity';

export const pokemonRelations = relations(pokemonEntity, ({ one, many }) => {
  return {
    types: many(pokemonTypeEntity, {
      relationName: 'pokemon_types_pokemon',
    }),
    abilities: many(pokemonAbilityEntity, {
      relationName: 'pokemon_abilities_pokemon',
    }),
  }
})
