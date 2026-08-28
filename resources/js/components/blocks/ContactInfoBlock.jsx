import { Section, SectionHeading } from '../Section';

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
                    {data.phone ? (
                        <div>
                            <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-500">Telepon</dt>
                            <dd className="mt-2 text-base">
                                <a href={`tel:${data.phone}`} className="text-primary-600 underline">
                                    {data.phone}
                                </a>
                            </dd>
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
        </Section>
    );
}
