import Link from 'next/link';
import { Search, Heart, Package, BarChart3, Home, Sparkles } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-indigo-500/20 bg-slate-950/80 backdrop-blur-2xl shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <Link href="/" className="group flex items-center space-x-3">
            <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-2.5 shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-3">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Gundam Paradise
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center space-x-2 rounded-xl px-5 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-indigo-500/20 hover:text-indigo-300 hover:scale-105"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/search"
              className="flex items-center space-x-2 rounded-xl px-5 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-indigo-500/20 hover:text-indigo-300 hover:scale-105"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center space-x-2 rounded-xl px-5 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-indigo-500/20 hover:text-indigo-300 hover:scale-105"
            >
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </Link>
            <Link
              href="/collection"
              className="flex items-center space-x-2 rounded-xl px-5 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-indigo-500/20 hover:text-indigo-300 hover:scale-105"
            >
              <Package className="h-5 w-5" />
              <span>Collection</span>
            </Link>
            <Link
              href="/stats"
              className="flex items-center space-x-2 rounded-xl px-5 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-indigo-500/20 hover:text-indigo-300 hover:scale-105"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Stats</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="rounded-xl p-3 text-slate-300 transition-all hover:bg-indigo-500/20 hover:text-indigo-300">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}