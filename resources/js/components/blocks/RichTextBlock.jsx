import { Section, SectionHeading } from '../Section';

export default function RichTextBlock({ data }) {
    return (
        <Section>
            {data.heading ? <SectionHeading title={data.heading} /> : null}
            <div
                className="prose-cms mt-6 max-w-3xl"
                dangerouslySetInnerHTML={{ __html: data.body ?? '' }}
            />
        </Section>
    );
}
