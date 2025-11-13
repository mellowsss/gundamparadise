import Link from 'next/link';
import { Search, TrendingDown, Package, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gundam Paradise
            </span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
            Track prices, manage your collection, and never miss a deal on your favorite Gunpla.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-4">
            <Link
              href="/search"
              className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
            >
              <Search className="inline h-5 w-5 mr-2" />
              Search Kits
            </Link>
            <Link
              href="/wishlist"
              className="rounded-lg border-2 border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              <Heart className="inline h-5 w-5 mr-2" />
              My Wishlist
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="rounded-lg bg-blue-100 p-3">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Kits Tracked</p>
                <p className="text-2xl font-bold text-gray-900">500+</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="rounded-lg bg-green-100 p-3">
                <TrendingDown className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Price Alerts</p>
                <p className="text-2xl font-bold text-gray-900">Active</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="rounded-lg bg-purple-100 p-3">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Stores</p>
                <p className="text-2xl font-bold text-gray-900">10+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}