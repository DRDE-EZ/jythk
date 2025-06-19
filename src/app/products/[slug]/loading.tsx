import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="max-w-full mx-auto space-y-10 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex justify-center lg:justify-start">
            <Skeleton className="aspect-square w-full rounded-none"></Skeleton>
          </div>
          <div className="flex mt-3 lg:mt-0 flex-col justify-start space-y-6">
            <Skeleton className="h-12 w-80 rounded-xs" />
            <Skeleton className="h-40 w-full rounded-xs" />
            <Skeleton className="h-40 w-full rounded-xs" />
            <Skeleton className="h-14 w-60 rounded-xs" />
          </div>
        </div>
      </div>
    </main>
  );
}
