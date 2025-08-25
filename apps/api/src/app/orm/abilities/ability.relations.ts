import { relations } from 'drizzle-orm';
import { abilityEntity } from '@coreloops-orm/abilities/ability.entity';
import { pokemonAbilityEntity } from '@coreloops-orm/pokemon-abilities/pokemon-ability.entity';

export const abilityRelations = relations(abilityEntity, ({ many }) => {
  return {
    pokemonAbilities: many(pokemonAbilityEntity, {
      relationName: 'pokemon_abilities_ability',
    })
  }
})
