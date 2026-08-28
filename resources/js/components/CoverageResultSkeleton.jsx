import { Skeleton } from './Skeleton';

export default function CoverageResultSkeleton() {
    return (
        <div
            aria-hidden="true"
            className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)]"
        >
            <Skeleton className="h-1.5 w-full rounded-none" />

            <div className="p-8">
                <Skeleton className="h-6 w-28 rounded-full" />
                <Skeleton className="mt-4 h-6 w-3/4" />

                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />

                <Skeleton className="mt-4 h-16 w-full" />

                <div className="mt-8 flex flex-wrap gap-3">
                    <Skeleton className="h-10 w-36 rounded-full" />
                    <Skeleton className="h-10 w-40 rounded-full" />
                </div>
            </div>
        </div>
    );
}
