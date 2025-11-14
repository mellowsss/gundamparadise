import Link from 'next/link';
import { Search, TrendingDown, Package, Heart, Sparkles, Zap, ArrowRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-indigo-500/20 border border-indigo-500/30 px-6 py-3 text-sm font-semibold text-indigo-300 backdrop-blur-xl">
              <Sparkles className="h-5 w-5" />
              <span>Track. Manage. Collect.</span>
            </div>
            
            <h1 className="mb-8 text-7xl font-black tracking-tight text-white sm:text-8xl lg:text-9xl">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Gundam
              </span>
              <br />
              <span className="text-white">Paradise</span>
            </h1>
            
            <p className="mx-auto mb-12 max-w-3xl text-2xl leading-relaxed text-slate-300 sm:text-3xl">
              Your ultimate destination for tracking Gunpla prices, managing your collection, and discovering the best deals on model kits.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link
                href="/search"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-10 py-5 text-xl font-bold text-white shadow-2xl shadow-indigo-500/50 transition-all hover:scale-105 hover:shadow-indigo-500/70"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Search className="h-6 w-6" />
                  Explore Kits
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Link>
              
              <Link
                href="/wishlist"
                className="rounded-2xl border-2 border-white/20 bg-white/5 px-10 py-5 text-xl font-semibold text-white backdrop-blur-xl transition-all hover:border-white/40 hover:bg-white/10 hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  <Heart className="h-6 w-6" />
                  My Wishlist
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-5xl font-black text-white sm:text-6xl">
            Everything You Need
          </h2>
          <p className="text-2xl text-slate-400">
            Powerful tools for every Gunpla enthusiast
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="group relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-10 backdrop-blur-xl transition-all hover:scale-105 hover:border-indigo-400/50 hover:shadow-2xl hover:shadow-indigo-500/30">
            <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-xl">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Smart Search</h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              Find kits by grade, series, or name. Filter and discover exactly what you're looking for with our powerful search.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 p-10 backdrop-blur-xl transition-all hover:scale-105 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/30">
            <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-4 shadow-xl">
              <TrendingDown className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Price Tracking</h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              Track prices across stores, view history charts, and get alerts when prices drop to your target.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 p-10 backdrop-blur-xl transition-all hover:scale-105 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/30">
            <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-4 shadow-xl">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Collection</h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              Organize your collection, track spending, and see detailed statistics about your Gunpla journey.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group relative overflow-hidden rounded-3xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-red-500/10 p-10 backdrop-blur-xl transition-all hover:scale-105 hover:border-pink-400/50 hover:shadow-2xl hover:shadow-pink-500/30">
            <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 p-4 shadow-xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Wishlist</h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              Save kits you want, set target prices, and never miss a deal when prices drop.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-amber-500/10 p-10 backdrop-blur-xl transition-all hover:scale-105 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/30">
            <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-r from-yellow-600 to-orange-600 p-4 shadow-xl">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Price Alerts</h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              Get notified instantly when prices drop or kits are back in stock at your favorite stores.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 p-10 backdrop-blur-xl transition-all hover:scale-105 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/30">
            <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 p-4 shadow-xl">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Store Links</h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              Direct links to buy from trusted stores like HobbyLink Japan and USA Gundam Store.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 p-16 backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2),transparent_70%)]"></div>
          <div className="relative text-center">
            <h2 className="mb-6 text-5xl font-black text-white sm:text-6xl">
              Ready to Start Collecting?
            </h2>
            <p className="mb-10 text-2xl text-slate-300">
              Join thousands of Gunpla enthusiasts tracking their collections
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-10 py-5 text-xl font-bold text-white shadow-2xl shadow-indigo-500/50 transition-all hover:scale-105 hover:shadow-indigo-500/70"
            >
              Get Started
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}