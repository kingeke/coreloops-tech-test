import { useApiQuery } from '@/src/api/hooks/use-api-query';
import { Button } from '@coreloops-ui/button';
import { Dialog, DialogContent, DialogOverlay } from '@coreloops-ui/dialog';
import { ViewPokemonDto } from '@coreloops/shared-types';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ViewMovesDto } from '../../../../../../libs/shared-types/src/view/move.dto';

type ViewPokemonModalProps = {
  open: boolean;
  pokemon: ViewPokemonDto;
  onClose: () => void;
};

export const ViewPokemonModal = ({ open, pokemon, onClose }: ViewPokemonModalProps) => {
  const { isLoading, isError, data } = useApiQuery<ViewPokemonDto>(
    [`pokemon/${pokemon.id}/moves`],
    `/pokemon/${pokemon.id}/moves`,
  );

  // sort state
  const [sortKey, setSortKey] = useState<'level' | 'power'>('level');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const moves: ViewMovesDto[] = data?.moves ?? [];

  const sortedMoves = useMemo(() => {
    return [...moves].sort((a, b) => {
      const aVal = a[sortKey] ?? 0;
      const bVal = b[sortKey] ?? 0;
      if (aVal === bVal) return 0;
      return sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : aVal > bVal ? -1 : 1;
    });
  }, [moves, sortKey, sortDir]);

  const handleSort = (key: 'level' | 'power') => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <Dialog modal open={open}>
      <DialogOverlay className="bg-card-background fixed inset-0 z-10 flex items-center justify-center px-10">
        <DialogContent className="flex max-h-[calc(80vh)] w-full max-w-[calc(80vw)] flex-col overflow-auto p-0 pb-6">
          <div className="flex flex-row items-center justify-end gap-4 p-4">
            <Button variant="secondary" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
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
          <div className="p-5">
            <ul>
              <li>Name: {pokemon.name}</li>
              <li>Pokedex Number: {pokemon.pokedexNumber}</li>
            </ul>
          </div>
          {/* Moves Table */}
          <div className="p-5">
            <table className="w-full border-collapse border text-sm">
              <thead>
                <tr className="bg-muted/20">
                  <th className="cursor-pointer px-3 py-2 text-left">Name</th>
                  <th className="cursor-pointer px-3 py-2 text-left" onClick={() => handleSort('level')}>
                    Level {sortKey === 'level' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-3 py-2 text-left">Accuracy</th>
                  <th className="px-3 py-2 text-left">Class</th>
                  <th className="cursor-pointer px-3 py-2 text-left" onClick={() => handleSort('power')}>
                    Power {sortKey === 'power' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-3 py-2 text-left">PP</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={6} className="text-muted-foreground p-4 text-center">
                      Loading moves…
                    </td>
                  </tr>
                )}
                {isError && (
                  <tr>
                    <td colSpan={6} className="text-destructive p-4 text-center">
                      Failed to load moves.
                    </td>
                  </tr>
                )}
                {!isLoading &&
                  !isError &&
                  sortedMoves.map(m => (
                    <tr key={m.id} className="hover:bg-muted/10">
                      <td className="px-3 py-2">{m.name}</td>
                      <td className="px-3 py-2">{m.level ?? '-'}</td>
                      <td className="px-3 py-2">{m.accuracy ?? '-'}</td>
                      <td className="px-3 py-2">{m.damageClass}</td>
                      <td className="px-3 py-2">{m.power ?? '-'}</td>
                      <td className="px-3 py-2">{m.pp}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row items-center justify-end gap-4 px-4">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
