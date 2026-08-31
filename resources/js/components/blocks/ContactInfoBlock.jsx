import { Section, SectionHeading } from '../Section';
import WhatsappIcon from '../icons/WhatsappIcon';

export default function ContactInfoBlock({ data }) {
    return (
        <Section tone="surface">
            <SectionHeading title={data.heading ?? 'Kantor Kami'} />
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
                <dl className="space-y-6">
                    {data.address ? (
                        <div>
                            <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-500">Alamat</dt>
                            <dd className="mt-2 whitespace-pre-line text-base text-muted">{data.address}</dd>
                        </div>
                    ) : null}
                    {data.hours ? (
                        <div>
                            <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-500">Jam Operasional</dt>
                            <dd className="mt-2 text-base text-muted">{data.hours}</dd>
                        </div>
                    ) : null}
                    {data.email ? (
                        <div>
                            <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-500">Email</dt>
                            <dd className="mt-2 text-base">
                                <a href={`mailto:${data.email}`} className="text-primary-600 underline">
                                    {data.email}
                                </a>
                            </dd>
                        </div>
                    ) : null}
                </dl>

                {data.map_embed ? (
                    <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
                        <iframe
                            src={data.map_embed}
                            title="Peta lokasi kantor"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="h-[340px] w-full border-0"
                        />
                    </div>
                ) : null}
            </div>

            {data.sales_contacts?.length > 0 ? (
                <div className="mt-12 border-t border-black/5 pt-8">
                    <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-500">
                        Sales &amp; Customer Service
                    </h3>
                    <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
                        {data.sales_contacts.map((person) => (
                            <li key={person.name}>
                                <a
                                    href={person.whatsapp_url}
                                    target="_blank"
                                    rel="noopener"
                                    className="flex items-start gap-2"
                                >
                                    <WhatsappIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                                    <span className="text-sm leading-relaxed">
                                        <span className="block font-semibold text-ink">{person.name}</span>
                                        <span className="block text-muted">{person.phone}</span>
                                        {person.role ? (
                                            <span className="block text-muted">{person.role}</span>
                                        ) : null}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </Section>
    );
}
