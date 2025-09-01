import { useApiMutation } from '@/src/api/hooks/use-api-mutation';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { formatDexNo, useUser } from '@/src/lib/utils';
import { ViewPokemonDto } from '@coreloops/shared-types';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { ViewMessageDto } from '../../../../../../libs/shared-types/src/view/message.dto';

type PokemonCardProps = {
  pokemon: ViewPokemonDto;
  onDeleteSuccess: () => void;
  onViewClicked: (pokemon: ViewPokemonDto) => void;
};

export default function PokemonCard({ pokemon, onDeleteSuccess, onViewClicked }: PokemonCardProps) {
  const user = useUser();

  const onSuccess = () => {
    toast('Success', {
      description: 'Pokemon deleted successfully.',
    });
    onDeleteSuccess();
  };

  const { mutateAsync: deletePokemon, isPending: loginPending } = useApiMutation<null, ViewMessageDto>(
    `/pokemon/${pokemon.id}`,
    'DELETE',
    {
      onSuccess,
    },
  );

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await deletePokemon(null);
    } catch (e) {
      toast('Something went wrong', {
        description: 'Please try again',
        closeButton: true,
        classNames: {
          closeButton: 'text-card-foreground hover:text-card-foreground hover:bg-card-foreground',
          description: 'text-red-500',
        },
      });
    }
  };

  return (
    <Card key={pokemon.id} className="group transition">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="text-muted-foreground">{formatDexNo(pokemon.pokedexNumber)}</span>
          <span className="truncate font-semibold">{pokemon.name}</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="bg-muted/30 flex h-32 w-full items-center justify-center rounded-md border">
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokedexNumber}.png`}
              alt={pokemon.name}
              width={100}
              height={100}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {pokemon?.types?.map(t => {
              return <Image key={t.id} src={t.iconUrl} alt={t.name} width={100} height={75} />;
            })}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex w-full flex-row items-center justify-between gap-2">
        <Button size="sm" variant="secondary" onClick={() => onViewClicked(pokemon)}>
          View
        </Button>
        {user?.isAdmin && (
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash className="text-destructive size-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
