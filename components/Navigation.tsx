import Link from 'next/link';
import { Search, Heart, Package, BarChart3, Home, Sparkles } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-2 transition-transform group-hover:scale-110">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gundam Paradise
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className="flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/search"
              className="flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
            >
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </Link>
            <Link
              href="/collection"
              className="flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
            >
              <Package className="h-4 w-4" />
              <span>Collection</span>
            </Link>
            <Link
              href="/stats"
              className="flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Stats</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="rounded-lg p-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
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