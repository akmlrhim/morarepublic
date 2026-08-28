import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

export default function Reveal({ as = 'div', delay = 0, className, children, ...props }) {
    const reducedMotion = useReducedMotion();
    const MotionTag = motion[as];

    return (
        <MotionTag
            className={className}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: '0px 0px -10% 0px' }}
            transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : delay / 1000, ease: EASE }}
            {...props}
        >
            {children}
        </MotionTag>
    );
}
