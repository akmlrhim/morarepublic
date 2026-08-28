import { Section, SectionHeading } from '../Section';

export default function TimelineBlock({ data }) {
    const items = data.items ?? [];

    return (
        <Section tone="surface">
            <SectionHeading title={data.heading} />
            <ol className="mt-10 space-y-8 border-l-2 border-line pl-8">
                {items.map((item, index) => (
                    <li key={index} className="relative">
                        <span
                            aria-hidden="true"
                            className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-primary-500"
                        />
                        <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-500">{item.year}</p>
                        <h3 className="mt-2 text-xl font-semibold text-ink">{item.title}</h3>
                        {item.description ? (
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{item.description}</p>
                        ) : null}
                    </li>
                ))}
            </ol>
        </Section>
    );
}
