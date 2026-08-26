import { Head, Link } from '@inertiajs/react';

export default function Welcome({ name }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 dark:bg-gray-900">
                <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-white/10">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Hello, {name}
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Laravel + Inertia + React + Tailwind sudah aktif.
                    </p>

                    <Link
                        href="/"
                        className="mt-6 inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                    >
                        Reload via Inertia
                    </Link>
                </div>
            </div>
        </>
    );
}
