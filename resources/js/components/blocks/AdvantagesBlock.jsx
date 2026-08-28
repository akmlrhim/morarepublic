import Reveal from "../Reveal";
import { Section, SectionHeading } from "../Section";

export default function AdvantagesBlock({ data }) {
    const items = data.items ?? [];

    return (
        <Section>
            <SectionHeading
                eyebrow={data.eyebrow}
                title={data.heading}
                description={data.description}
                align="center"
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((item, index) => (
                    <Reveal key={index} delay={index * 60} className="h-full">
                        <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white">
                            <div className="p-5 pb-0">
                                <h3 className="text-lg font-bold text-ink">
                                    {item.title}
                                </h3>
                                {item.description ? (
                                    <p className="mt-2 text-sm leading-relaxed text-muted">
                                        {item.description}
                                    </p>
                                ) : null}
                            </div>

                            {item.image ? (
                                <div className="relative mt-5 min-h-40 w-full flex-1">
                                    <img
                                        src={item.image}
                                        alt=""
                                        aria-hidden="true"
                                        loading="lazy"
                                        className="absolute inset-0 h-full w-full object-cover opacity-60"
                                    />
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-white via-white/55 to-transparent"
                                    />
                                </div>
                            ) : null}
                        </article>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
}
