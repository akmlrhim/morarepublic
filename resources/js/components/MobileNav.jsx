import { Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import Button from './Button';
import { Container } from './Section';
import { cx } from '../lib/format';
import { isActivePath } from '../lib/nav';

export default function MobileNav({ nav, currentPath, onNavigate }) {
    const [openGroup, setOpenGroup] = useState(
        () => nav.find((item) => item.children?.some((child) => isActivePath(child.href, currentPath)))?.label ?? null,
    );
    const reducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-line bg-white lg:hidden"
        >
            <Container className="flex flex-col gap-1 py-4">
                {nav.map((item) =>
                    item.children ? (
                        <div key={item.label}>
                            <button
                                type="button"
                                onClick={() => setOpenGroup((value) => (value === item.label ? null : item.label))}
                                aria-expanded={openGroup === item.label}
                                className="flex w-full items-center justify-between gap-4 rounded-xl px-3 py-3 text-left text-[15px] font-semibold text-ink transition hover:bg-primary-100/60"
                            >
                                {item.label}
                                <span
                                    aria-hidden="true"
                                    className={cx(
                                        'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 transition duration-200',
                                        openGroup === item.label && 'rotate-45',
                                    )}
                                >
                                    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                                        <path
                                            d="M10 4v12M4 10h12"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                            </button>

                            {openGroup === item.label ? (
                                <ul className="mb-2 ml-3 border-l border-line pl-3">
                                    {item.children.map((child) => (
                                        <li key={child.href}>
                                            <Link
                                                href={child.href}
                                                onClick={onNavigate}
                                                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:text-primary-500"
                                                aria-current={isActivePath(child.href, currentPath) ? 'page' : undefined}
                                            >
                                                {child.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    ) : (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className="rounded-xl px-3 py-3 text-[15px] font-semibold text-ink transition hover:bg-primary-100/60"
                            aria-current={isActivePath(item.href, currentPath) ? 'page' : undefined}
                        >
                            {item.label}
                        </Link>
                    ),
                )}

                <Button href="/kontak" className="mt-3" onClick={onNavigate}>
                    Hubungi Kami
                </Button>
            </Container>
        </motion.div>
    );
}
