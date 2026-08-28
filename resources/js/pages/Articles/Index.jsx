import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ArticleCard from '../../components/ArticleCard';
import ArticleCardSkeleton from '../../components/ArticleCardSkeleton';
import PageHeader from '../../components/PageHeader';
import { Section } from '../../components/Section';
import PublicLayout from '../../layouts/PublicLayout';
import { cx } from '../../lib/format';

export default function ArticlesIndex({ articles, categories = [], activeCategory, seo }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const stopStart = router.on('start', () => setLoading(true));
        const stopFinish = router.on('finish', () => setLoading(false));

        return () => {
            stopStart();
            stopFinish();
        };
    }, []);

    function filterBy(slug) {
        router.get('/berita', slug ? { kategori: slug } : {}, {
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <PublicLayout seo={seo} transparentNav>
            <PageHeader
                eyebrow="Berita"
                title="Kabar dan Artikel"
                description="Pengumuman layanan, tips internet, dan cerita dari lapangan."
            />

            <Section>
                {categories.length > 0 ? (
                    <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
                        <button
                            type="button"
                            onClick={() => filterBy(null)}
                            aria-pressed={!activeCategory}
                            className={cx(
                                'rounded-full px-4 py-2 text-sm font-semibold transition',
                                !activeCategory
                                    ? 'bg-primary-500 text-white'
                                    : 'border border-line text-muted hover:text-primary-500',
                            )}
                        >
                            Semua
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.slug}
                                type="button"
                                onClick={() => filterBy(category.slug)}
                                aria-pressed={activeCategory === category.slug}
                                className={cx(
                                    'rounded-full px-4 py-2 text-sm font-semibold transition',
                                    activeCategory === category.slug
                                        ? 'bg-primary-500 text-white'
                                        : 'border border-line text-muted hover:text-primary-500',
                                )}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                ) : null}

                {loading ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
                        <span className="sr-only">Memuat berita...</span>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <ArticleCardSkeleton key={index} />
                        ))}
                    </div>
                ) : articles.data.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {articles.data.map((article) => (
                            <ArticleCard key={article.slug} article={article} />
                        ))}
                    </div>
                ) : (
                    <p className="text-base text-muted">Belum ada berita untuk filter ini.</p>
                )}

                {articles.links?.length > 3 ? (
                    <nav className="mt-12 flex flex-wrap justify-center gap-2" aria-label="Navigasi halaman">
                        {articles.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    preserveScroll
                                    className={cx(
                                        'rounded-full px-4 py-2 text-sm font-semibold transition',
                                        link.active
                                            ? 'bg-primary-500 text-white'
                                            : 'border border-line text-muted hover:text-primary-500',
                                    )}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="rounded-full px-4 py-2 text-sm font-semibold text-muted/50"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ),
                        )}
                    </nav>
                ) : null}
            </Section>
        </PublicLayout>
    );
}
