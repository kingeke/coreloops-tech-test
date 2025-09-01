'use client';

import { useApiInfiniteQuery } from '@/src/api/hooks/use-api-query';
import PokemonCard from '@/src/components/pages/home/pokemon-card';
import PokemonSkeleton from '@/src/components/pages/home/pokemon-skeleton';
import { ViewPokemonModal } from '@/src/components/pages/home/view-pokemon-modal';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@coreloops-ui/card';
import { ViewPokemonDto } from '@coreloops/shared-types';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

function useGridColumns() {
  const [cols, setCols] = useState(1);

  useEffect(() => {
    // Tailwind defaults we're using: 1 (base), 2 (sm≥640), 3 (lg≥1024), 4 (xl≥1280)
    const qXL = window.matchMedia('(min-width: 1280px)');
    const qLG = window.matchMedia('(min-width: 1024px)');
    const qSM = window.matchMedia('(min-width: 640px)');

    const update = () => {
      if (qXL.matches) setCols(4);
      else if (qLG.matches) setCols(3);
      else if (qSM.matches) setCols(2);
      else setCols(1);
    };

    update();
    qXL.addEventListener('change', update);
    qLG.addEventListener('change', update);
    qSM.addEventListener('change', update);
    return () => {
      qXL.removeEventListener('change', update);
      qLG.removeEventListener('change', update);
      qSM.removeEventListener('change', update);
    };
  }, []);

  return cols;
}

export default function Home() {
  const { items, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useApiInfiniteQuery<ViewPokemonDto>(['pokemon'], '/pokemon', { limit: 25 });

  const [openViewPokemonModal, setOpenViewPokemonModal] = useState({
    pokemon: null as ViewPokemonDto | null,
    open: false,
  });

  // Sentinel element we observe to trigger fetching more
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Only observe when there's more to fetch and we're not already fetching
  const canAutoFetch = useMemo(() => hasNextPage && !isFetchingNextPage, [hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (!sentinelRef.current || !canAutoFetch) return;

    const el = sentinelRef.current;
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first?.isIntersecting) {
          void fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0,
      },
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [canAutoFetch, fetchNextPage]);

  const handleCloseViewPokemonModal = () => {
    setOpenViewPokemonModal({
      open: false,
      pokemon: null,
    });
  };

  const handleOpenViewPokemonModal = (pokemon: ViewPokemonDto) => {
    setOpenViewPokemonModal({
      open: true,
      pokemon,
    });
  };

  // get the number of columns in a row to render missing column skeletons when fetching next page
  const cols = useGridColumns();
  const trailingSlots = useMemo(() => {
    if (!isFetchingNextPage) return 0;
    if (items.length === 0) return 0;
    const remainder = items.length % cols;
    return remainder === 0 ? 0 : cols - remainder;
  }, [isFetchingNextPage, items.length, cols]);

  if (isError) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle>Something went wrong</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">We couldn’t load Pokémon right now. Please try again.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => fetchNextPage()}>Retry</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6">
      <div className="w-full max-w-[80vw] self-center">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight">Pokédex</h1>

        {/* Initial loading skeletons */}
        {isLoading && (!items || items.length === 0) && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <PokemonSkeleton />
          </div>
        )}
        {!isLoading && items.length > 0 && (
          <>
            {/* Grid of Pokémon cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map(p => (
                <PokemonCard
                  pokemon={p}
                  key={p.id}
                  onDeleteSuccess={refetch}
                  onViewClicked={handleOpenViewPokemonModal}
                />
              ))}

              {/* While fetching next page, fill remaining slots of the current row with skeletons */}
              {trailingSlots > 0 && <PokemonSkeleton count={trailingSlots} />}
            </div>

            {/* Fetching spinner + manual fallback button */}
            <div className="mt-6 flex items-center justify-center gap-3">
              {isFetchingNextPage && (
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading more…
                </div>
              )}
              {!isFetchingNextPage && hasNextPage && (
                <Button onClick={() => fetchNextPage()} variant="outline">
                  Load more
                </Button>
              )}
              {!hasNextPage && items.length > 0 && (
                <p className="text-muted-foreground text-sm">You’ve reached the end.</p>
              )}
            </div>

            {/* Sentinel: sits below the list; when it enters viewport we auto-fetch */}
            <div ref={sentinelRef} className="h-1 w-full" />
          </>
        )}
        {openViewPokemonModal.pokemon && (
          <ViewPokemonModal
            open={openViewPokemonModal.open}
            pokemon={openViewPokemonModal.pokemon}
            onClose={handleCloseViewPokemonModal}
          />
        )}
      </div>
    </div>
  );
}
