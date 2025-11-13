'use client';

import { useState, useEffect } from 'react';
import { Package, DollarSign, Heart, TrendingUp, Sparkles } from 'lucide-react';

interface Stats {
  collectionCount: number;
  wishlistCount: number;
  totalSpent: number;
  wishlistValue: number;
  averageCollectionPrice: number;
  averageWishlistPrice: number;
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
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

      const totalSpent = collection.reduce(
        (sum: number, item: any) => sum + (item.purchasePrice || 0),
        0
      );

      const wishlistValue = wishlist.reduce(
        (sum: number, item: any) =>
          sum + (item.kit.currentPrice || item.kit.averagePrice || 0),
        0
      );

      const stats: Stats = {
        collectionCount: collection.length,
        wishlistCount: wishlist.length,
        totalSpent,
        wishlistValue,
        averageCollectionPrice:
          collection.length > 0 ? totalSpent / collection.length : 0,
        averageWishlistPrice:
          wishlist.length > 0 ? wishlistValue / wishlist.length : 0,
      };

      setStats(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-blue-300 text-lg">Loading statistics...</div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-2">Statistics</h1>
          <p className="text-xl text-blue-200">Overview of your Gundam collection and wishlist</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Collection Count */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-200">Collection</p>
                <p className="mt-2 text-4xl font-bold text-white">
                  {stats.collectionCount}
                </p>
                <p className="mt-1 text-sm text-blue-300">kits owned</p>
              </div>
              <div className="rounded-full bg-blue-500/30 p-4 backdrop-blur-sm">
                <Package className="h-8 w-8 text-blue-300" />
              </div>
            </div>
          </div>

          {/* Wishlist Count */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-pink-500/20 to-rose-500/20 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pink-200">Wishlist</p>
                <p className="mt-2 text-4xl font-bold text-white">
                  {stats.wishlistCount}
                </p>
                <p className="mt-1 text-sm text-pink-300">kits wanted</p>
              </div>
              <div className="rounded-full bg-pink-500/30 p-4 backdrop-blur-sm">
                <Heart className="h-8 w-8 text-pink-300" />
              </div>
            </div>
          </div>

          {/* Total Spent */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-200">Total Spent</p>
                <p className="mt-2 text-4xl font-bold text-white">
                  ${stats.totalSpent.toFixed(2)}
                </p>
                <p className="mt-1 text-sm text-green-300">
                  Avg: ${stats.averageCollectionPrice.toFixed(2)}
                </p>
              </div>
              <div className="rounded-full bg-green-500/30 p-4 backdrop-blur-sm">
                <DollarSign className="h-8 w-8 text-green-300" />
              </div>
            </div>
          </div>

          {/* Wishlist Value */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Wishlist Value</p>
                <p className="mt-2 text-4xl font-bold text-white">
                  ${stats.wishlistValue.toFixed(2)}
                </p>
                <p className="mt-1 text-sm text-purple-300">
                  Avg: ${stats.averageWishlistPrice.toFixed(2)}
                </p>
              </div>
              <div className="rounded-full bg-purple-500/30 p-4 backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 text-purple-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-3xl border border-white/20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 backdrop-blur-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-3">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Summary</h2>
          </div>
          <div className="space-y-4 text-blue-100 text-lg">
            <p>
              You own <span className="font-bold text-white">{stats.collectionCount}</span> kits
              with a total investment of{' '}
              <span className="font-bold text-green-400">
                ${stats.totalSpent.toFixed(2)}
              </span>
              .
            </p>
            <p>
              Your wishlist contains <span className="font-bold text-white">{stats.wishlistCount}</span> kits
              with an estimated value of{' '}
              <span className="font-bold text-purple-400">
                ${stats.wishlistValue.toFixed(2)}
              </span>
              .
            </p>
            <p>
              To complete your wishlist, you would need approximately{' '}
              <span className="font-bold text-blue-400">
                ${stats.wishlistValue.toFixed(2)}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}