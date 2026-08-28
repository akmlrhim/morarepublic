import { cx } from '../lib/format';

/**
 * Logo menyesuaikan latar di belakangnya. Kedua versi dirender bersamaan lalu
 * di-cross-fade, supaya pergantian saat scroll tidak berkedip menunggu gambar dimuat.
 */
export default function Logo({ site, solid, className }) {
    const dark = site?.logo;
    const light = site?.logo_light ?? dark;

    if (!dark && !light) {
        return (
            <span
                className={cx(
                    'text-lg font-extrabold tracking-tight',
                    solid ? 'text-primary-700' : 'text-white',
                    className,
                )}
            >
                {site?.name ?? 'Mora Republic'}
            </span>
        );
    }

    return (
        <span className={cx('relative block h-11 w-[131px] md:h-14 md:w-[166px]', className)}>
            <img
                src={dark}
                alt={site?.name ?? 'Logo'}
                width="297"
                height="100"
                className={cx(
                    'absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ease-in-out',
                    solid ? 'opacity-100' : 'opacity-0',
                )}
            />
            <img
                src={light}
                alt=""
                aria-hidden="true"
                width="297"
                height="100"
                className={cx(
                    'absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ease-in-out',
                    solid ? 'opacity-0' : 'opacity-100',
                )}
            />
        </span>
    );
}
