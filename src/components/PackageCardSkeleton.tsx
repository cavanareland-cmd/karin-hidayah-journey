import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton yang meniru struktur kartu paket (gambar + badge, judul,
 * grid info 2x2, chip fasilitas, harga & tombol) agar transisi loading mulus.
 */
export const PackageCardSkeleton = () => (
  <div className="bg-card rounded-2xl overflow-hidden border border-border flex flex-col">
    {/* Image area with badge + rating placeholders */}
    <div className="relative h-52 w-full">
      <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      <Skeleton className="absolute top-3 left-3 h-6 w-20 rounded-full bg-muted-foreground/20" />
      <Skeleton className="absolute top-3 right-3 h-6 w-20 rounded-full bg-muted-foreground/20" />
    </div>

    <div className="p-5 flex flex-col flex-1">
      {/* Title */}
      <Skeleton className="h-6 w-4/5 mb-3" />

      {/* Info grid 2x2 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm shrink-0" />
            <Skeleton className="h-4 w-full max-w-[90px]" />
          </div>
        ))}
      </div>

      {/* Facility chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-6 w-14 rounded-md" />
      </div>

      {/* Price & CTA */}
      <div className="flex items-center justify-between pt-4 mt-auto border-t border-border">
        <div className="space-y-2">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
    </div>
  </div>
);

export const PackageCardSkeletonGrid = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <PackageCardSkeleton key={i} />
    ))}
  </div>
);

export default PackageCardSkeleton;
