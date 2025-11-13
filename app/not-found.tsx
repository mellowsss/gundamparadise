import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-blue-200 mb-4">Page Not Found</h2>
        <p className="text-blue-300 mb-8 text-lg">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-blue-500/50"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}