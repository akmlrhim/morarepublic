import Reveal from './Reveal';
import { cx } from '../lib/format';

export function Container({ className, children }) {
    return <div className={cx('mx-auto w-full max-w-[1280px] px-6 lg:px-12', className)}>{children}</div>;
}

export function Section({ className, tone = 'white', children, ...props }) {
    const tones = {
        white: 'bg-white',
        surface: 'bg-white',
        dark: 'bg-primary-900 text-white',
    };

    return (
        <section className={cx('py-14 md:py-24', tones[tone] ?? tones.white, className)} {...props}>
            <Container>{children}</Container>
        </section>
    );
}

export function SectionHeading({ eyebrow, title, description, align = 'left', tone = 'light' }) {
    return (
        <Reveal className={cx('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
            {eyebrow ? (
                <p className={cx('text-[13px] font-semibold uppercase tracking-[0.14em]', tone === 'dark' ? 'text-primary-300' : 'text-primary-500')}>
                    {eyebrow}
                </p>
            ) : null}
            {title ? (
                <h2
                    className={cx(
                        'text-balance-heading mt-3 text-[28px] font-bold leading-tight md:text-[40px]',
                        tone === 'dark' ? 'text-white' : 'text-ink',
                    )}
                >
                    {title}
                </h2>
            ) : null}
            {description ? (
                <p className={cx('mt-4 text-base leading-relaxed', tone === 'dark' ? 'text-white/70' : 'text-muted')}>
                    {description}
                </p>
            ) : null}
        </Reveal>
    );
}
