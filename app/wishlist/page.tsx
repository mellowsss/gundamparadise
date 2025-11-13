'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ExternalLink, Heart } from 'lucide-react';
import KitCard from '@/components/KitCard';

interface WishlistItem {
  id: string;
  kitId: string;
  targetPrice?: number | null;
  notes?: string | null;
  kit: {
    id: string;
    name: string;
    grade: string;
    series?: string | null;
    scale?: string | null;
    imageUrl?: string | null;
    currentPrice?: number | null;
    averagePrice?: number | null;
  };
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (kitId: string) => {
    try {
      await fetch(`/api/wishlist/${kitId}`, { method: 'DELETE' });
      setItems(items.filter((item) => item.kitId !== kitId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const totalWishlistValue = items.reduce((sum, item) => {
    return sum + (item.kit.currentPrice || item.kit.averagePrice || 0);
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-blue-300 text-lg">Loading wishlist...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">My Wishlist</h1>
          <p className="text-xl text-blue-200">
            {items.length} {items.length === 1 ? 'kit' : 'kits'} in your wishlist
          </p>
          {items.length > 0 && (
            <div className="mt-6 rounded-2xl border border-white/20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-200">Estimated Total Value</p>
                  <p className="text-3xl font-bold text-white">
                    ${totalWishlistValue.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-full bg-pink-500/20 p-4">
                  <Heart className="h-8 w-8 text-pink-400" />
                </div>
              </div>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/20 bg-white/10 p-16 text-center backdrop-blur-sm">
            <Heart className="mx-auto h-16 w-16 text-gray-500 mb-4" />
            <p className="text-gray-300 mb-4 text-lg">Your wishlist is empty.</p>
            <Link
              href="/search"
              className="inline-block rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
            >
              Browse kits to add to your wishlist →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="relative group">
                <KitCard kit={item.kit} />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => removeFromWishlist(item.kitId)}
                    className="rounded-full bg-red-600/80 p-2.5 text-white shadow-xl backdrop-blur-sm transition-all hover:bg-red-600 hover:scale-110"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {item.targetPrice && (
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-pink-500/20 backdrop-blur-sm border border-pink-500/30 p-3">
                    <p className="text-xs text-pink-200 font-medium">Target Price</p>
                    <p className="font-bold text-pink-300 text-lg">
                      ${item.targetPrice.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}