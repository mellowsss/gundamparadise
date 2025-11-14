import Link from 'next/link';
import { Search, TrendingDown, Package, Heart, ArrowRight, BarChart3, Bell, ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-pink-950/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Live Price Tracking</span>
            </div>
            
            <h1 className="mb-6 text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
              Gundam
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Paradise
              </span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-xl text-white/70 sm:text-2xl">
              Track prices, manage your collection, and never miss a deal on Gunpla model kits.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/search"
                className="group flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-black transition-all hover:bg-white/90 hover:scale-105"
              >
                <Search className="h-5 w-5" />
                Browse Kits
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/wishlist"
                className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
              >
                <Heart className="h-5 w-5" />
                My Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Everything You Need
          </h2>
          <p className="text-lg text-white/60">
            Powerful tools for every Gunpla collector
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
            <div className="mb-4 inline-flex rounded-lg bg-blue-500/20 p-3">
              <Search className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Smart Search</h3>
            <p className="text-sm text-white/60">
              Find kits by grade, series, or name with powerful filters.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
            <div className="mb-4 inline-flex rounded-lg bg-green-500/20 p-3">
              <TrendingDown className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Price Tracking</h3>
            <p className="text-sm text-white/60">
              Track prices across stores and view historical charts.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
            <div className="mb-4 inline-flex rounded-lg bg-purple-500/20 p-3">
              <Package className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Collection</h3>
            <p className="text-sm text-white/60">
              Organize your kits and track your spending.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
            <div className="mb-4 inline-flex rounded-lg bg-pink-500/20 p-3">
              <Bell className="h-6 w-6 text-pink-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Price Alerts</h3>
            <p className="text-sm text-white/60">
              Get notified when prices drop to your target.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Preview */}
      <div className="border-t border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white">1000+</div>
              <div className="text-sm text-white/60">Kits Tracked</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white">50+</div>
              <div className="text-sm text-white/60">Stores Monitored</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/60">Price Updates</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-sm">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Start?
            </h2>
            <p className="mb-8 text-lg text-white/60">
              Join thousands of collectors tracking their Gunpla
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-black transition-all hover:bg-white/90 hover:scale-105"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
