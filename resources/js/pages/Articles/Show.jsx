import { Link } from '@inertiajs/react';
import ArticleCard from '../../components/ArticleCard';
import { Container, Section, SectionHeading } from '../../components/Section';
import PublicLayout from '../../layouts/PublicLayout';
import { formatDate } from '../../lib/format';

export default function ArticleShow({ article, related = [], seo }) {
    return (
        <PublicLayout seo={seo}>
            <article>
                <Container className="pb-4 pt-12">
                    <nav aria-label="Breadcrumb" className="text-sm text-muted">
                        <Link href="/berita" className="transition hover:text-primary-500">
                            Berita
                        </Link>
                        {article.category ? (
                            <>
                                <span aria-hidden="true" className="mx-2">
                                    /
                                </span>
                                <Link
                                    href={`/berita?kategori=${article.category.slug}`}
                                    className="transition hover:text-primary-500"
                                >
                                    {article.category.name}
                                </Link>
                            </>
                        ) : null}
                    </nav>

                    <h1 className="text-balance-heading mt-6 max-w-4xl text-[30px] font-extrabold leading-tight text-ink md:text-[44px]">
                        {article.title}
                    </h1>

                    {article.published_at ? (
                        <p className="mt-4 text-sm text-muted">
                            Dipublikasikan <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
                        </p>
                    ) : null}
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
                    <SectionHeading eyebrow="Berita Lain" title="Baca juga" />
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
