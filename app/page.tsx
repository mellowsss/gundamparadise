'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, TrendingDown, Package, Heart, Sparkles, ArrowRight } from 'lucide-react';
import KitCard from '@/components/KitCard';

interface Kit {
  id: string;
  name: string;
  grade: string;
  series?: string | null;
  scale?: string | null;
  imageUrl?: string | null;
  currentPrice?: number | null;
  averagePrice?: number | null;
  storeLinks?: Array<{
    id: string;
    url: string;
    store: {
      name: string;
      website: string;
    };
  }>;
}

export default function Home() {
  const [featuredKits, setFeaturedKits] = useState<Kit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedKits();
  }, []);

  const fetchFeaturedKits = async () => {
    try {
      const response = await fetch('/api/kits?limit=8');
      const data = await response.json();
      setFeaturedKits(data.kits || []);
    } catch (error) {
      console.error('Error fetching featured kits:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 px-6 py-2.5 text-sm font-bold text-blue-300 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Track. Manage. Collect.</span>
            </div>
            
            <h1 className="mb-6 text-6xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gundam
              </span>
              <br />
              <span className="text-white">Paradise</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-white/80 sm:text-2xl">
              Your ultimate destination for tracking Gunpla prices, managing your collection, and discovering the best deals on model kits.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/search"
                className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-blue-500/70"
              >
                <Search className="h-5 w-5" />
                Explore Gundams
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/wishlist"
                className="rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  <Heart className="h-5 w-5" />
                  My Wishlist
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Gundams Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">
            Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Gundams</span>
          </h2>
          <p className="text-lg text-white/60">Discover popular model kits from various series</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mb-4 inline-block h-10 w-10 animate-spin rounded-full border-3 border-white/20 border-t-blue-500"></div>
              <p className="text-sm font-medium text-white/60">Loading Gundams...</p>
            </div>
          </div>
        ) : featuredKits.length === 0 ? (
          <div className="mx-auto max-w-md rounded-xl border-2 border-white/10 bg-white/5 p-16 text-center backdrop-blur-sm">
            <Package className="mx-auto mb-4 h-16 w-16 text-white/20" />
            <p className="mb-2 text-lg font-bold text-white">No Gundams available</p>
            <p className="text-sm text-white/60">Check back later for featured Gundams</p>
          </div>
        ) : (
          <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredKits.map((kit) => (
              <KitCard key={kit.id} kit={kit} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
          >
            View All Gundams
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">Why Choose Gundam Paradise?</h2>
            <p className="text-lg text-white/60">Everything you need to manage your Gunpla collection</p>
          </div>

          <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group rounded-xl border-2 border-white/10 bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-8 backdrop-blur-sm transition-all hover:border-blue-500/30 hover:scale-105 text-center">
              <div className="mb-4 inline-flex rounded-xl bg-blue-500/20 p-4">
                <TrendingDown className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Price Tracking</h3>
              <p className="text-white/70">Track price history and get alerts when prices drop to your target</p>
            </div>

            <div className="group rounded-xl border-2 border-white/10 bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-8 backdrop-blur-sm transition-all hover:border-purple-500/30 hover:scale-105 text-center">
              <div className="mb-4 inline-flex rounded-xl bg-purple-500/20 p-4">
                <Package className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Collection Management</h3>
              <p className="text-white/70">Keep track of your Gunpla collection and monitor your spending</p>
            </div>

            <div className="group rounded-xl border-2 border-white/10 bg-gradient-to-br from-pink-500/10 to-pink-600/10 p-8 backdrop-blur-sm transition-all hover:border-pink-500/30 hover:scale-105 text-center">
              <div className="mb-4 inline-flex rounded-xl bg-pink-500/20 p-4">
                <Heart className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Wishlist</h3>
              <p className="text-white/70">Save kits you want and track their prices over time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
