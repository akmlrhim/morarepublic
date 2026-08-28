import Reveal from '../Reveal';
import { Section, SectionHeading } from '../Section';

export default function FeatureGridBlock({ data }) {
    const items = data.items ?? [];

    return (
        <Section>
            <SectionHeading title={data.heading} description={data.description} />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item, index) => (
                    <Reveal key={index} delay={index * 60}>
                        <article className="group rounded-[var(--radius-card)] border border-line bg-white p-8 shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
                            <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-ribbon-gradient" />
                            <h3 className="mt-5 text-xl font-semibold text-ink">{item.title}</h3>
                            {item.description ? (
                                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                            ) : null}
                        </article>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
}
