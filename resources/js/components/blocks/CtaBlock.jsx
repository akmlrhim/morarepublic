import Button from '../Button';
import Reveal from '../Reveal';
import { Container } from '../Section';

export default function CtaBlock({ data }) {
    return (
        <section className="py-14 md:py-24">
            <Container>
                <Reveal>
                    <div className="relative overflow-hidden rounded-[28px] bg-hero-gradient px-8 py-14 text-center md:px-16 md:py-20">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-ribbon-gradient opacity-40 blur-3xl"
                        />
                        <div className="relative mx-auto max-w-2xl">
                            <h2 className="text-balance-heading text-[28px] font-bold leading-tight text-white md:text-[40px]">
                                {data.heading}
                            </h2>
                            {data.description ? (
                                <p className="mt-4 text-base leading-relaxed text-white/80">{data.description}</p>
                            ) : null}
                            {data.button_text && data.button_url ? (
                                <Button href={data.button_url} variant="secondary" size="lg" className="mt-8">
                                    {data.button_text}
                                </Button>
                            ) : null}
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}
