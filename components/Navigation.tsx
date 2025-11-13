import Link from 'next/link';
import { Search, Heart, Package, BarChart3, Home } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">Gundam Paradise</div>
          </Link>
          
          <div className="flex items-center space-x-1">
            <Link
              href="/"
              className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/search"
              className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </Link>
            <Link
              href="/collection"
              className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Package className="h-4 w-4" />
              <span>Collection</span>
            </Link>
            <Link
              href="/stats"
              className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Stats</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
