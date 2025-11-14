'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Heart, ArrowRight } from 'lucide-react';
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-white">My Wishlist</h1>
          <p className="text-lg text-white/60">
            {items.length} {items.length === 1 ? 'kit' : 'kits'}
          </p>
        </div>

        {items.length > 0 && (
          <div className="mb-8 rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-white/60">Estimated Total Value</p>
                <p className="text-3xl font-bold text-white">
                  ${totalWishlistValue.toFixed(2)}
                </p>
              </div>
              <div className="rounded-full bg-pink-500/20 p-4">
                <Heart className="h-6 w-6 text-pink-400" />
              </div>
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-16 text-center">
            <Heart className="mx-auto mb-4 h-16 w-16 text-white/20" />
            <p className="mb-4 text-lg font-medium text-white/60">Your wishlist is empty</p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-white/90"
            >
              Browse kits
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="relative group">
                <KitCard kit={item.kit} />
                <button
                  onClick={() => removeFromWishlist(item.kitId)}
                  className="absolute top-4 right-4 rounded-full bg-red-500/80 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500"
                  title="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                {item.targetPrice && (
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-pink-500/30 bg-pink-500/20 p-3 backdrop-blur-sm">
                    <p className="mb-1 text-xs text-pink-200">Target Price</p>
                    <p className="text-lg font-bold text-pink-300">
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
