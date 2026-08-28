import AnimatedNumber from "../AnimatedNumber";
import Reveal from "../Reveal";
import { Container } from "../Section";

export default function StatsStripBlock({ data }) {
    const items = data?.items ?? [];

    if (items.length === 0) {
        return null;
    }

    return (
        <section className="bg-primary-900 py-14 md:py-16">
            <Container>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4">
                    {items.map((item, index) => (
                        <Reveal key={index} delay={index * 80} as="div">
                            <dt className="sr-only">{item.label}</dt>
                            <dd>
                                <AnimatedNumber
                                    value={item.value}
                                    delay={index * 0.15}
                                    className="block text-[32px] font-extrabold leading-none tabular-nums text-white md:text-[44px]"
                                />
                                <span className="mt-3 block text-sm text-white/70">
                                    {item.label}
                                </span>
                            </dd>
                        </Reveal>
                    ))}
                </dl>
            </Container>
        </section>
    );
}
