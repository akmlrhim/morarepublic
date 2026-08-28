import { Link } from '@inertiajs/react';
import { formatDate } from '../lib/format';

export default function ArticleCard({ article }) {
    return (
        <article className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
            {article.cover_image ? (
                <img src={article.cover_image} alt="" aria-hidden="true" className="h-48 w-full object-cover" />
            ) : (
                <div aria-hidden="true" className="h-2 w-full bg-ribbon-gradient" />
            )}

            <div className="flex flex-1 flex-col p-7">
                <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-muted">
                    {article.category ? (
                        <span className="rounded-full bg-primary-100 px-3 py-1 font-semibold text-primary-600">
                            {article.category.name}
                        </span>
                    ) : null}
                    {article.published_at ? <time dateTime={article.published_at}>{formatDate(article.published_at)}</time> : null}
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug text-ink">
                    <Link href={`/berita/${article.slug}`} className="transition hover:text-primary-500">
                        {article.title}
                    </Link>
                </h3>

                {article.excerpt ? (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{article.excerpt}</p>
                ) : null}

                <Link
                    href={`/berita/${article.slug}`}
                    className="mt-6 text-sm font-semibold text-primary-500 transition group-hover:translate-x-0.5"
                >
                    Baca selengkapnya
                    <span aria-hidden="true"> &rsaquo;</span>
                </Link>
            </div>
        </article>
    );
}
