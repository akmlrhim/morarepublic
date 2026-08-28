import { motion, useReducedMotion } from 'framer-motion';
import Button from '../Button';
import HeroBackground from '../HeroBackground';
import { Container } from '../Section';

const EASE = [0.16, 1, 0.3, 1];

export default function HeroBlock({ data }) {
    const reducedMotion = useReducedMotion();

    function fadeUp(delay) {
        return {
            initial: reducedMotion ? false : { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : delay, ease: EASE },
        };
    }

    return (
        <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-primary-900 pb-24 pt-32 md:pt-40">
            <HeroBackground image={data.image} variant="full" priority />

            <Container className="relative">
                <div className="max-w-3xl">
                    <motion.h1
                        {...fadeUp(0)}
                        className="text-balance-heading text-[36px] font-extrabold leading-[1.08] text-white drop-shadow-[0_2px_12px_rgba(46,15,77,0.5)] md:text-[64px]"
                    >
                        {data.heading}
                    </motion.h1>
                    {data.subheading ? (
                        <motion.p
                            {...fadeUp(0.1)}
                            className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg"
                        >
                            {data.subheading}
                        </motion.p>
                    ) : null}
                    <motion.div {...fadeUp(0.2)} className="mt-9 flex flex-wrap gap-3">
                        {data.cta_text && data.cta_url ? (
                            <Button href={data.cta_url} variant="secondary" size="lg">
                                {data.cta_text}
                            </Button>
                        ) : null}
                        <Button href="/cek-coverage" variant="outline" size="lg">
                            Cek Coverage
                        </Button>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
