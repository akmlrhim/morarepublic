import { Skeleton } from './Skeleton';

export default function ArticleCardSkeleton() {
    return (
        <div
            aria-hidden="true"
            className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)]"
        >
            <Skeleton className="h-48 w-full rounded-none" />

            <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                </div>

                <Skeleton className="mt-4 h-5 w-full" />
                <Skeleton className="mt-2 h-5 w-2/3" />

                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />

                <Skeleton className="mt-6 h-4 w-32" />
            </div>
        </div>
    );
}
