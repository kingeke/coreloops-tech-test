import { Card, CardContent, CardFooter, CardHeader } from '@/src/components/ui/card';
import { Skeleton } from '@/src/components/ui/skeleton';

type PokemonSkeletonProps = {
  count?: number;
};

export default function PokemonSkeleton({ count = 8 }: PokemonSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-2 h-5 w-40" />
            <Skeleton className="h-28 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-9 w-24" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
