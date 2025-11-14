'use client';

import { useState, useEffect } from 'react';
import { Package, DollarSign, Heart, TrendingUp, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Stats {
  totalKits: number;
  totalSpent: number;
  averagePrice: number;
  wishlistCount: number;
  wishlistValue: number;
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stats>({
    totalKits: 0,
    totalSpent: 0,
    averagePrice: 0,
    wishlistCount: 0,
    wishlistValue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [collectionRes, wishlistRes] = await Promise.all([
        fetch('/api/collection'),
        fetch('/api/wishlist'),
      ]);

      const collection = await collectionRes.json();
      const wishlist = await wishlistRes.json();

      const totalSpent = collection.reduce((sum: number, item: any) => {
        return sum + (item.purchasePrice || 0);
      }, 0);

      const wishlistValue = wishlist.reduce((sum: number, item: any) => {
        return sum + (item.kit.currentPrice || item.kit.averagePrice || 0);
      }, 0);

      setStats({
        totalKits: collection.length,
        totalSpent,
        averagePrice: collection.length > 0 ? totalSpent / collection.length : 0,
        wishlistCount: wishlist.length,
        wishlistValue,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-white">Statistics</h1>
          <p className="text-lg text-white/60">Your Gunpla collection overview</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Collection Stats */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="mb-4 inline-flex rounded-lg bg-blue-500/20 p-3">
              <Package className="h-6 w-6 text-blue-400" />
            </div>
            <p className="mb-1 text-sm text-white/60">Total Kits</p>
            <p className="text-3xl font-bold text-white">{stats.totalKits}</p>
            <Link
              href="/collection"
              className="mt-4 inline-flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors"
            >
              View collection
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="mb-4 inline-flex rounded-lg bg-green-500/20 p-3">
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
            <p className="mb-1 text-sm text-white/60">Total Spent</p>
            <p className="text-3xl font-bold text-white">${stats.totalSpent.toFixed(2)}</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="mb-4 inline-flex rounded-lg bg-purple-500/20 p-3">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <p className="mb-1 text-sm text-white/60">Average Price</p>
            <p className="text-3xl font-bold text-white">${stats.averagePrice.toFixed(2)}</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="mb-4 inline-flex rounded-lg bg-pink-500/20 p-3">
              <Heart className="h-6 w-6 text-pink-400" />
            </div>
            <p className="mb-1 text-sm text-white/60">Wishlist Items</p>
            <p className="text-3xl font-bold text-white">{stats.wishlistCount}</p>
            <p className="mt-2 text-xs text-white/40">
              ${stats.wishlistValue.toFixed(2)} estimated value
            </p>
            <Link
              href="/wishlist"
              className="mt-4 inline-flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors"
            >
              View wishlist
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Collection Breakdown</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Kits Owned</span>
                <span className="text-sm font-medium text-white">{stats.totalKits}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Total Investment</span>
                <span className="text-sm font-medium text-white">${stats.totalSpent.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Average per Kit</span>
                <span className="text-sm font-medium text-white">${stats.averagePrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Wishlist Overview</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Items in Wishlist</span>
                <span className="text-sm font-medium text-white">{stats.wishlistCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Estimated Cost</span>
                <span className="text-sm font-medium text-white">${stats.wishlistValue.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Average per Item</span>
                <span className="text-sm font-medium text-white">
                  ${stats.wishlistCount > 0 ? (stats.wishlistValue / stats.wishlistCount).toFixed(2) : '0.00'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/search"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              Browse Kits
            </Link>
            <Link
              href="/wishlist"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              View Wishlist
            </Link>
            <Link
              href="/collection"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              View Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
