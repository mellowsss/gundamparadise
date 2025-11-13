'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Something went wrong!</h1>
        <p className="text-blue-200 mb-6">{error.message}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
