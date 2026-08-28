import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cx } from '../lib/format';

export default function Accordion({ items = [], className }) {
    const [openIndex, setOpenIndex] = useState(0);
    const reducedMotion = useReducedMotion();

    if (items.length === 0) {
        return null;
    }

    return (
        <div className={cx('divide-y divide-line rounded-[var(--radius-card)] border border-line bg-white', className)}>
            {items.map((item, index) => {
                const open = openIndex === index;

                return (
                    <div key={index}>
                        <h3>
                            <button
                                type="button"
                                onClick={() => setOpenIndex(open ? -1 : index)}
                                aria-expanded={open}
                                aria-controls={`faq-panel-${index}`}
                                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-ink transition hover:text-primary-500"
                            >
                                {item.question}
                                <motion.span
                                    aria-hidden="true"
                                    animate={{ rotate: open ? 45 : 0 }}
                                    transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeInOut' }}
                                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600"
                                >
                                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                                        <path
                                            d="M10 4v12M4 10h12"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </motion.span>
                            </button>
                        </h3>
                        <AnimatePresence initial={false}>
                            {open ? (
                                <motion.div
                                    id={`faq-panel-${index}`}
                                    key="content"
                                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                                    transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <p className="whitespace-pre-line px-6 pb-6 text-sm leading-relaxed text-muted">
                                        {item.answer}
                                    </p>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
