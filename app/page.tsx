import Link from 'next/link';
import { Search, TrendingDown, Package, Heart, Sparkles, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Track. Manage. Collect.</span>
            </div>
            
            <h1 className="mb-6 text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gundam
              </span>
              <br />
              <span className="text-white">Paradise</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-xl leading-8 text-blue-100 sm:text-2xl">
              Your ultimate destination for tracking Gunpla prices, managing your collection, and discovering the best deals on model kits.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/search"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-blue-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Explore Kits
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Link>
              
              <Link
                href="/wishlist"
                className="rounded-xl border-2 border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20"
              >
                <span className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  My Wishlist
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Everything You Need
          </h2>
          <p className="mt-4 text-xl text-blue-200">
            Powerful tools for every Gunpla enthusiast
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="mb-4 inline-flex rounded-xl bg-blue-500/20 p-3">
              <Search className="h-6 w-6 text-blue-300" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Smart Search</h3>
            <p className="text-blue-200">
              Find kits by grade, series, or name. Filter and discover exactly what you're looking for.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:border-green-400/50 hover:shadow-2xl hover:shadow-green-500/20">
            <div className="mb-4 inline-flex rounded-xl bg-green-500/20 p-3">
              <TrendingDown className="h-6 w-6 text-green-300" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Price Tracking</h3>
            <p className="text-green-200">
              Track prices across stores, view history charts, and get alerts when prices drop.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="mb-4 inline-flex rounded-xl bg-purple-500/20 p-3">
              <Package className="h-6 w-6 text-purple-300" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Collection</h3>
            <p className="text-purple-200">
              Organize your collection, track spending, and see detailed statistics.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-pink-500/10 to-rose-500/10 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:border-pink-400/50 hover:shadow-2xl hover:shadow-pink-500/20">
            <div className="mb-4 inline-flex rounded-xl bg-pink-500/20 p-3">
              <Heart className="h-6 w-6 text-pink-300" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Wishlist</h3>
            <p className="text-pink-200">
              Save kits you want, set target prices, and never miss a deal.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/20">
            <div className="mb-4 inline-flex rounded-xl bg-yellow-500/20 p-3">
              <Zap className="h-6 w-6 text-yellow-300" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Price Alerts</h3>
            <p className="text-yellow-200">
              Get notified instantly when prices drop or kits are back in stock.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20">
            <div className="mb-4 inline-flex rounded-xl bg-cyan-500/20 p-3">
              <Sparkles className="h-6 w-6 text-cyan-300" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Store Links</h3>
            <p className="text-cyan-200">
              Direct links to buy from trusted stores like HobbyLink Japan and USA Gundam Store.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-12 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Start Collecting?
            </h2>
            <p className="mb-8 text-lg text-blue-200">
              Join thousands of Gunpla enthusiasts tracking their collections
            </p>
            <Link
              href="/search"
              className="inline-block rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-blue-500/50"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}