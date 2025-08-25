import * as pokemonEntity from '@coreloops-orm/pokemons/pokemon.entity';
import * as pokemonRelations from '@coreloops-orm/pokemons/pokemon.relations';
import * as abilityEntity from '@coreloops-orm/abilities/ability.entity';
import * as abilityRelations from '@coreloops-orm/abilities/ability.relations';
import * as pokemonAbilityEntity from '@coreloops-orm/pokemon-abilities/pokemon-ability.entity';
import * as pokemonAbilityRelations from '@coreloops-orm/pokemon-abilities/pokemon-ability.relations';
import * as pokemonTypeEntity from '@coreloops-orm/pokemon-types/pokemon-type.entity';
import * as pokemonTypeRelations from '@coreloops-orm/pokemon-types/pokemon-type.relations';
import * as typeEntity from '@coreloops-orm/types/type.entity';
import * as typeRelations from '@coreloops-orm/types/type.relations';

export const schema = {
  ...pokemonEntity,
  ...pokemonRelations,
  ...abilityEntity,
  ...abilityRelations,
  ...pokemonAbilityEntity,
  ...pokemonAbilityRelations,
  ...pokemonTypeEntity,
  ...pokemonTypeRelations,
  ...typeEntity,
  ...typeRelations,
};
