import { cx } from '../lib/format';

export const HERO_IMAGE = '/img/hero-home.webp';

/*
 * Scrim dua lapis dipakai di semua hero: lapis multiply menarik foto ke palet ungu
 * brand, lapis gradient menggelapkan area tempat teks putih duduk supaya kontrasnya
 * tetap lolos WCAG AA. Hero pendek butuh scrim lebih rata karena object-cover
 * memotong ke bagian tengah foto yang paling terang.
 */
const GRADIENTS = {
    full: 'linear-gradient(180deg,rgba(46,15,77,0.75) 0%,rgba(46,15,77,0.25) 38%,rgba(46,15,77,0.82) 78%,rgba(46,15,77,0.95) 100%)',
    compact: 'linear-gradient(180deg,rgba(46,15,77,0.88) 0%,rgba(46,15,77,0.72) 45%,rgba(46,15,77,0.90) 100%)',
};

export default function HeroBackground({ image, variant = 'compact', priority = false }) {
    return (
        <>
            <img
                src={image || HERO_IMAGE}
                alt=""
                aria-hidden="true"
                fetchPriority={priority ? 'high' : undefined}
                loading={priority ? undefined : 'lazy'}
                className={cx(
                    'absolute inset-0 -z-20 h-full w-full object-cover',
                    variant === 'full' ? 'object-center' : 'object-[center_65%]',
                )}
            />

            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary-900/45 mix-blend-multiply" />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{ backgroundImage: GRADIENTS[variant] ?? GRADIENTS.compact }}
            />

            <div
                aria-hidden="true"
                className={cx(
                    'pointer-events-none absolute -z-10 rounded-full bg-ribbon-gradient blur-3xl',
                    variant === 'full'
                        ? '-right-24 top-1/4 h-[420px] w-[420px] opacity-30'
                        : '-right-32 top-0 h-96 w-96 opacity-25',
                )}
            />
        </>
    );
}
