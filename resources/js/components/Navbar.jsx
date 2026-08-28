import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Button from './Button';
import Logo from './Logo';
import MobileNav from './MobileNav';
import NavDropdown from './NavDropdown';
import { Container } from './Section';
import { cx } from '../lib/format';
import { isActivePath } from '../lib/nav';
import { useWhatsapp } from '../lib/useWhatsapp';

export default function Navbar({ transparent = false }) {
    const page = usePage();
    const site = page.props.site;
    const currentPath = page.url;
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const whatsapp = useWhatsapp();
    const nav = site?.nav ?? [];

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 24);
        }

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const solid = scrolled || !transparent || open;

    return (
        <header
            className={cx(
                'fixed inset-x-0 top-0 z-50 transition duration-300 ease-in-out',
                solid ? 'bg-white/95 shadow-[0_2px_16px_rgba(46,15,77,0.08)]' : 'bg-transparent',
            )}
        >
            <Container className="flex h-[76px] items-center justify-between gap-4 md:h-[88px]">
                <Link href="/" className="flex items-center" aria-label={`Beranda ${site?.name ?? ''}`}>
                    <Logo site={site} solid={solid} />
                </Link>

                <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu utama">
                    {nav.map((item) =>
                        item.children ? (
                            <NavDropdown
                                key={item.label}
                                item={item}
                                solid={solid}
                                active={item.children.some((child) => isActivePath(child.href, currentPath))}
                            />
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cx(
                                    'rounded-full px-3 py-2 text-[15px] font-semibold transition duration-200',
                                    solid
                                        ? isActivePath(item.href, currentPath)
                                            ? 'text-primary-500'
                                            : 'text-ink/80 hover:text-primary-500'
                                        : isActivePath(item.href, currentPath)
                                          ? 'text-white'
                                          : 'text-white/80 hover:text-white',
                                )}
                                aria-current={isActivePath(item.href, currentPath) ? 'page' : undefined}
                            >
                                {item.label}
                            </Link>
                        ),
                    )}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    {whatsapp.available ? (
                        <Button
                            as="a"
                            href={whatsapp.url}
                            target="_blank"
                            rel="noopener"
                            onClick={whatsapp.track}
                            variant={solid ? 'primary' : 'secondary'}
                            size="sm"
                        >
                            Hubungi Kami
                        </Button>
                    ) : (
                        <Button href="/kontak" variant={solid ? 'primary' : 'secondary'} size="sm">
                            Hubungi Kami
                        </Button>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-expanded={open}
                    aria-label={open ? 'Tutup menu' : 'Buka menu'}
                    className={cx(
                        'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition duration-200 lg:hidden',
                        solid ? 'bg-primary-500 text-white' : 'bg-white/20 text-white',
                    )}
                >
                    <span aria-hidden="true" className="relative flex h-4 w-[18px] flex-col items-center justify-center gap-[5px]">
                        <span
                            className={cx(
                                'block h-[1.5px] w-full rounded-full bg-current transition duration-200 ease-out',
                                open && 'translate-y-[6.5px] rotate-45',
                            )}
                        />
                        <span
                            className={cx(
                                'block h-[1.5px] w-full rounded-full bg-current transition duration-200 ease-out',
                                open && 'opacity-0',
                            )}
                        />
                        <span
                            className={cx(
                                'block h-[1.5px] w-full rounded-full bg-current transition duration-200 ease-out',
                                open && '-translate-y-[6.5px] -rotate-45',
                            )}
                        />
                    </span>
                </button>
            </Container>

            <AnimatePresence>
                {open ? <MobileNav nav={nav} currentPath={currentPath} onNavigate={() => setOpen(false)} /> : null}
            </AnimatePresence>
        </header>
    );
}
