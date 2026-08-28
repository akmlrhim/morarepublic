import HeroBackground from './HeroBackground';
import { Container } from './Section';

export default function PageHeader({ eyebrow, title, description, image, children }) {
    return (
        <section className="relative isolate overflow-hidden bg-primary-900 pb-16 pt-32 md:pb-20 md:pt-40">
            <HeroBackground image={image} priority />

            <Container className="relative">
                {eyebrow ? (
                    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/80">{eyebrow}</p>
                ) : null}
                <h1 className="text-balance-heading mt-3 max-w-3xl text-[32px] font-extrabold leading-tight text-white drop-shadow-[0_2px_12px_rgba(46,15,77,0.45)] md:text-[52px]">
                    {title}
                </h1>
                {description ? (
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85">{description}</p>
                ) : null}
                {children}
            </Container>
        </section>
    );
}
