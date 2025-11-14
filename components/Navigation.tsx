import Link from 'next/link';
import { Search, Heart, Package, BarChart3, Home } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-xl font-bold text-white group-hover:text-white/80 transition-colors">
              Gundam Paradise
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-all hover:bg-white/5 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </span>
            </Link>
            <Link
              href="/search"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-all hover:bg-white/5 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </span>
            </Link>
            <Link
              href="/wishlist"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-all hover:bg-white/5 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Wishlist
              </span>
            </Link>
            <Link
              href="/collection"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-all hover:bg-white/5 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Collection
              </span>
            </Link>
            <Link
              href="/stats"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-all hover:bg-white/5 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Stats
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white transition-all">
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
