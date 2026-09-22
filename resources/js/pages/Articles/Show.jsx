import { Head, Link, usePage } from '@inertiajs/react';
import ArticleCard from '../../components/ArticleCard';
import ShareButtons from '../../components/ShareButtons';
import { Container, Section, SectionHeading } from '../../components/Section';
import PublicLayout from '../../layouts/PublicLayout';
import { formatDate } from '../../lib/format';

export default function ArticleShow({ article, related = [], seo }) {
    const { site } = usePage().props;

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: seo?.description ?? undefined,
        image: article.cover_image ?? seo?.image ?? undefined,
        datePublished: article.published_at ?? undefined,
        dateModified: article.published_at ?? undefined,
        mainEntityOfPage: seo?.canonical,
        author: article.author_name
            ? { '@type': 'Person', name: article.author_name }
            : { '@type': 'Organization', name: site?.name },
        publisher: { '@type': 'Organization', name: site?.name, logo: site?.logo },
    };

    return (
        <PublicLayout seo={seo}>
            <Head>
                <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
            </Head>

            <article>
                <Container className="pb-4 pt-12">
                    <nav aria-label="Breadcrumb" className="text-sm text-ink">
                        <Link href="/artikel" className="transition hover:text-primary-500">
                            Artikel
                        </Link>
                        {article.category ? (
                            <>
                                <span aria-hidden="true" className="mx-2">
                                    /
                                </span>
                                <Link
                                    href={`/artikel?kategori=${article.category.slug}`}
                                    className="transition hover:text-primary-500"
                                >
                                    {article.category.name}
                                </Link>
                            </>
                        ) : null}
                    </nav>

                    <h1 className="text-balance-heading mt-6 max-w-4xl text-[20px] font-extrabold leading-tight text-ink sm:text-[28px] md:text-[44px]">
                        {article.title}
                     </h1>

                    <div className="mt-4 flex flex-col gap-2 text-sm text-ink sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                        {article.published_at ? (
                            <span>
                                Dipublikasikan <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
                            </span>
                        ) : null}
                        {article.author_name ? (
                            <span className="flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-muted">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span className="font-medium text-ink">{article.author_name}</span>
                            </span>
                        ) : null}
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-4">
                        <ShareButtons title={article.title} />
                    </div>
                </Container>

                {article.cover_image ? (
                    <Container className="pt-6">
                        <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-card)]"
                        />
                    </Container>
                ) : null}

                <Container className="py-12">
                    <div
                        className="prose-cms max-w-3xl"
                        dangerouslySetInnerHTML={{ __html: article.content ?? '' }}
                    />
                </Container>
            </article>

            {related.length > 0 ? (
                <Section tone="surface">
                    <SectionHeading eyebrow="Artikel Lain" title="Baca juga" />
                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {related.map((item) => (
                            <ArticleCard key={item.slug} article={item} />
                        ))}
                    </div>
                </Section>
            ) : null}
        </PublicLayout>
    );
}
