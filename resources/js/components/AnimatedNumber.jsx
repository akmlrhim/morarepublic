import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const EASE_OUT_CUBIC = (t) => 1 - (1 - t) ** 3;

/**
 * Menampilkan angka dalam `value` (mis. "24+", "1-3", "24/7") dan menghitungnya
 * naik dari 0 ke nilai aslinya sekali saat elemen masuk viewport. Bagian
 * non-angka (+, %, -, /, dst.) dibiarkan apa adanya.
 */
export default function AnimatedNumber({ value, duration = 1.6, delay = 0, className }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const reducedMotion = useReducedMotion();
    const [progress, setProgress] = useState(reducedMotion ? 1 : 0);

    useEffect(() => {
        if (!inView || reducedMotion) {
            return;
        }

        let frame;
        let start;

        function tick(now) {
            if (start === undefined) {
                start = now;
            }

            const elapsed = Math.max(0, now - start - delay * 1000) / 1000;
            const next = Math.min(elapsed / duration, 1);
            setProgress(EASE_OUT_CUBIC(next));

            if (next < 1) {
                frame = requestAnimationFrame(tick);
            }
        }

        frame = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frame);
    }, [inView, duration, delay, reducedMotion]);

    const display = String(value).replace(/\d+/g, (match) => String(Math.round(Number(match) * progress)));

    return (
        <span ref={ref} className={className}>
            {display}
        </span>
    );
}
