import Reveal from "../Reveal";
import { Section, SectionHeading } from "../Section";

const iconProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-9 w-9",
    "aria-hidden": "true",
};

const ICONS = [
    <svg {...iconProps} key="shield">
        <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" />
        <path d="M9 12l2 2 4-4" />
    </svg>,
    <svg {...iconProps} key="globe">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.4 2.5 3.8 5.8 3.8 9s-1.4 6.5-3.8 9c-2.4-2.5-3.8-5.8-3.8-9s1.4-6.5 3.8-9Z" />
    </svg>,
    <svg {...iconProps} key="tower">
        <path d="M12 2v3M7.5 6.5a6.5 6.5 0 0 1 9 0M5 10a9 9 0 0 1 14 0" />
        <path d="M12 9v13M9 22h6" />
    </svg>,
    <svg {...iconProps} key="growth">
        <path d="M4 19h16" />
        <path d="M7 15l4-4 3 3 5-6" />
        <path d="M15 8h4v4" />
    </svg>,
    <svg {...iconProps} key="scale">
        <path d="M12 3v18M8 21h8" />
        <path d="M4 7h16M4 7l-3 6a3 3 0 0 0 6 0L4 7ZM20 7l3 6a3 3 0 0 1-6 0l3-6Z" />
    </svg>,
];

export default function MissionBlock({ data }) {
    const misi = data?.misi ?? [];

    return (
        <Section tone="surface" className="relative overflow-hidden">
            <div className="relative">
                <div className="mx-auto max-w-3xl rounded-[var(--radius-card)] bg-hero-gradient p-10 text-center text-white shadow-[var(--shadow-card)] md:p-14">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70">
                        Visi
                    </p>
                    <p className="text-balance-heading mt-4 text-[24px] font-bold leading-snug md:text-[32px]">
                        {data?.visi}
                    </p>
                </div>

                <div className="mt-16">
                    <SectionHeading
                        eyebrow="Misi"
                        title="Bagaimana kami mewujudkannya"
                        align="center"
                    />

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {misi.map((item, index) => {
                            const Icon = ICONS[index % ICONS.length];

                            return (
                                <Reveal
                                    key={index}
                                    delay={index * 60}
                                    className="h-full"
                                >
                                    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white">
                                        <div className="p-6 pb-0">
                                            <span
                                                aria-hidden="true"
                                                className="text-primary-500"
                                            >
                                                {Icon}
                                            </span>
                                            <h3 className="mt-4 text-lg font-bold text-ink">
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
                            );
                        })}
                    </div>
                </div>
            </div>
        </Section>
    );
}
