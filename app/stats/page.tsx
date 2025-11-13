'use client';

import { useState, useEffect } from 'react';
import { Package, DollarSign, Heart, TrendingUp } from 'lucide-react';

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
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading statistics...</div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>
        <p className="mt-2 text-gray-600">Overview of your Gundam collection and wishlist</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Collection Count */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Collection</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats.collectionCount}
              </p>
              <p className="mt-1 text-sm text-gray-500">kits owned</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Wishlist Count */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wishlist</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats.wishlistCount}
              </p>
              <p className="mt-1 text-sm text-gray-500">kits wanted</p>
            </div>
            <div className="rounded-full bg-pink-100 p-3">
              <Heart className="h-6 w-6 text-pink-600" />
            </div>
          </div>
        </div>

        {/* Total Spent */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="mt-2 text-3xl font-bold text-green-600">
                ${stats.totalSpent.toFixed(2)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Avg: ${stats.averageCollectionPrice.toFixed(2)}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Wishlist Value */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wishlist Value</p>
              <p className="mt-2 text-3xl font-bold text-blue-600">
                ${stats.wishlistValue.toFixed(2)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Avg: ${stats.averageWishlistPrice.toFixed(2)}
              </p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Summary</h2>
        <div className="space-y-2 text-gray-600">
          <p>
            You own <span className="font-semibold">{stats.collectionCount}</span> kits
            with a total investment of{' '}
            <span className="font-semibold text-green-600">
              ${stats.totalSpent.toFixed(2)}
            </span>
            .
          </p>
          <p>
            Your wishlist contains <span className="font-semibold">{stats.wishlistCount}</span> kits
            with an estimated value of{' '}
            <span className="font-semibold text-blue-600">
              ${stats.wishlistValue.toFixed(2)}
            </span>
            .
          </p>
          <p>
            To complete your wishlist, you would need approximately{' '}
            <span className="font-semibold text-purple-600">
              ${stats.wishlistValue.toFixed(2)}
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
