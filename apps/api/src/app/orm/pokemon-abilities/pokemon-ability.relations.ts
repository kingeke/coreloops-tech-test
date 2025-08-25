import { abilityEntity } from '@coreloops-orm/abilities/ability.entity';
import { pokemonAbilityEntity } from '@coreloops-orm/pokemon-abilities/pokemon-ability.entity';
import { pokemonEntity } from '@coreloops-orm/pokemons/pokemon.entity';
import { relations } from 'drizzle-orm';

export const pokemonAbilityRelations = relations(pokemonAbilityEntity, ({ one }) => {
  return {
    pokemon: one(pokemonEntity, {
      fields: [pokemonAbilityEntity.pokemonId],
      references: [pokemonEntity.id],
      relationName: 'pokemon_abilities_pokemon',
    }),
    ability: one(abilityEntity, {
      fields: [pokemonAbilityEntity.abilityId],
      references: [abilityEntity.id],
      relationName: 'pokemon_abilities_ability',
    }),
  };
});
