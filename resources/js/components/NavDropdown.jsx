import { Link } from '@inertiajs/react';
import { useEffect, useId, useRef, useState } from 'react';
import { cx } from '../lib/format';

/**
 * Dropdown menu utama. Terbuka lewat klik atau hover, dan tetap bisa
 * dioperasikan dengan keyboard: Escape menutup, Tab keluar menutup sendiri.
 */
export default function NavDropdown({ item, solid, active }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const closeTimer = useRef(null);
    const panelId = useId();

    useEffect(() => () => clearTimeout(closeTimer.current), []);

    useEffect(() => {
        if (!open) {
            return;
        }

        function onPointerDown(event) {
            if (!containerRef.current?.contains(event.target)) {
                setOpen(false);
            }
        }

        function onKeyDown(event) {
            if (event.key === 'Escape') {
                setOpen(false);
                containerRef.current?.querySelector('button')?.focus();
            }
        }

        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    function openNow() {
        clearTimeout(closeTimer.current);
        setOpen(true);
    }

    function closeSoon() {
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setOpen(false), 120);
    }

    return (
        <div
            ref={containerRef}
            className="relative"
            onMouseEnter={openNow}
            onMouseLeave={closeSoon}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setOpen(false);
                }
            }}
        >
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-haspopup="true"
                aria-controls={panelId}
                className={cx(
                    'inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[15px] font-semibold transition duration-200',
                    solid
                        ? active || open
                            ? 'text-primary-500'
                            : 'text-ink/80 hover:text-primary-500'
                        : active || open
                          ? 'text-white'
                          : 'text-white/80 hover:text-white',
                )}
            >
                {item.label}
                <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className={cx('h-4 w-4 transition duration-200', open && 'rotate-180')}
                >
                    <path
                        d="M5.5 7.5 10 12l4.5-4.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <div
                id={panelId}
                className={cx(
                    'absolute left-0 top-full w-72 pt-3 transition duration-200 ease-in-out',
                    open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
                )}
            >
                <ul className="overflow-hidden rounded-[18px] border border-line bg-white p-2 shadow-[var(--shadow-card)]">
                    {item.children.map((child) => (
                        <li key={child.href}>
                            <Link
                                href={child.href}
                                onClick={() => setOpen(false)}
                                tabIndex={open ? undefined : -1}
                                className="block rounded-xl px-4 py-3 text-[15px] font-semibold text-ink transition hover:bg-primary-100/60"
                            >
                                {child.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
