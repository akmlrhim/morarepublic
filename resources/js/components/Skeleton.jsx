import { cx } from '../lib/format';

export function Skeleton({ className }) {
    return <div aria-hidden="true" className={cx('animate-pulse rounded-md bg-line', className)} />;
}
