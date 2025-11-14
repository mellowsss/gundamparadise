import Link from 'next/link';
import { Search, Heart, Package, BarChart3, Home, Sparkles } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-white/10 bg-gradient-to-r from-slate-950/95 via-blue-950/95 to-purple-950/95 backdrop-blur-xl shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-2 shadow-lg transition-transform group-hover:scale-110">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gundam Paradise
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="rounded-xl px-5 py-2.5 text-sm font-bold text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </span>
            </Link>
            <Link
              href="/search"
              className="rounded-xl px-5 py-2.5 text-sm font-bold text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </span>
            </Link>
            <Link
              href="/wishlist"
              className="rounded-xl px-5 py-2.5 text-sm font-bold text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Wishlist
              </span>
            </Link>
            <Link
              href="/collection"
              className="rounded-xl px-5 py-2.5 text-sm font-bold text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Collection
              </span>
            </Link>
            <Link
              href="/stats"
              className="rounded-xl px-5 py-2.5 text-sm font-bold text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Stats
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="rounded-xl p-2 text-white/60 hover:bg-white/10 hover:text-white transition-all">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
