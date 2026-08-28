import { Container } from '../Section';

export default function CompanyIntroBlock({ data }) {
    const paragraphs = data?.paragraphs ?? [];

    return (
        <section className="relative overflow-hidden bg-white py-14 md:py-24">
            <Container className="relative">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-500">Siapa Kami</p>
                <div className="mt-4 max-w-4xl space-y-5">
                    {paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className={
                                index === 0
                                    ? 'text-balance-heading text-xl font-semibold leading-relaxed text-ink md:text-2xl'
                                    : 'text-base leading-relaxed text-muted'
                            }
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </Container>

            <div className="relative mt-6 w-screen -translate-x-1/2 left-1/2 md:mt-8">
                <img
                    src="/img/about.webp"
                    alt="Tim Mora Republic"
                    className="h-90 w-full object-cover md:h-125 lg:h-160"
                    loading="lazy"
                />
            </div>
        </section>
    );
}
