'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ExternalLink } from 'lucide-react';
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
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading wishlist...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="mt-2 text-gray-600">
          {items.length} {items.length === 1 ? 'kit' : 'kits'} in your wishlist
        </p>
        {items.length > 0 && (
          <div className="mt-4 rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-gray-600">
              Estimated total value:{' '}
              <span className="font-bold text-blue-600">
                ${totalWishlistValue.toFixed(2)}
              </span>
            </p>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
          <Link
            href="/search"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Browse kits to add to your wishlist →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="relative">
              <KitCard kit={item.kit} />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => removeFromWishlist(item.kitId)}
                  className="rounded-full bg-red-500 p-2 text-white shadow-lg hover:bg-red-600"
                  title="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {item.targetPrice && (
                <div className="mt-2 rounded-lg bg-pink-50 p-2 text-center">
                  <p className="text-xs text-gray-600">Target Price</p>
                  <p className="font-semibold text-pink-600">
                    ${item.targetPrice.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
