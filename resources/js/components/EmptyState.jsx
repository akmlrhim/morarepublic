export default function EmptyState({
    title = 'Belum ada data',
    description = 'Belum ada apa pun di sini. Begitu ada data baru, akan langsung muncul di sini.',
    className = '',
}) {
    return (
        <div className={`flex flex-col items-center py-16 text-center ${className}`}>
            <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                aria-hidden="true"
                className="text-line"
            >
                <rect
                    x="6"
                    y="6"
                    width="52"
                    height="52"
                    rx="16"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                />
            </svg>

            <p className="mt-5 text-base font-semibold text-ink">{title}</p>
            <p className="mt-1 max-w-xs text-sm text-muted">{description}</p>
        </div>
    );
}
