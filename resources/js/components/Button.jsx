import { Link } from '@inertiajs/react';
import { cx } from '../lib/format';

const VARIANTS = {
    primary:
        'bg-primary-500 text-white shadow-sm hover:bg-primary-600 active:bg-primary-700',
    secondary:
        'bg-white text-primary-500 shadow-sm hover:bg-primary-100',
    outline:
        'border-[1.5px] border-white/80 text-white hover:bg-white/10',
    ghost:
        'border-[1.5px] border-primary-500/30 text-primary-600 hover:bg-primary-100/60',
};

const SIZES = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-[15px]',
    lg: 'px-8 py-4 text-base',
};

const BASE =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-in-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100';

export default function Button({
    as,
    href,
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props
}) {
    const classes = cx(BASE, VARIANTS[variant] ?? VARIANTS.primary, SIZES[size] ?? SIZES.md, className);

    if (as === 'a' || (href && /^https?:|^mailto:|^tel:|#/.test(href))) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
