import Link from 'next/link';
import { Search, TrendingDown, Package, Heart, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to <span className="text-blue-600">Gundam Paradise</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Track Gundam model kit prices, manage your collection and wishlist, and never miss a deal on your favorite Gunpla.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/search"
            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Search Kits
          </Link>
          <Link
            href="/wishlist"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600"
          >
            View Wishlist <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to track Gunpla
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Search className="h-5 w-5 flex-none text-blue-600" />
                Search & Browse
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Search through thousands of Gundam kits by grade (HG, RG, MG, PG), series, and more. Filter and find exactly what you're looking for.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <TrendingDown className="h-5 w-5 flex-none text-blue-600" />
                Price Tracking
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Track current prices, view price history charts, and see average prices across multiple stores. Get alerts when prices drop.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Package className="h-5 w-5 flex-none text-blue-600" />
                Collection Management
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Organize your collection and wishlist. Track what you own, what you want, and how much you've spent.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Heart className="h-5 w-5 flex-none text-blue-600" />
                Wishlist
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Save kits you want to buy. Set target prices and get notified when they're available at your price point.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <BarChart3 className="h-5 w-5 flex-none text-blue-600" />
                Statistics
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  View detailed statistics about your collection, spending, and wishlist. See how much you've invested in your hobby.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <TrendingDown className="h-5 w-5 flex-none text-blue-600" />
                Price Alerts
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Set up alerts for price drops, back-in-stock notifications, and sales. Never miss a good deal again.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}