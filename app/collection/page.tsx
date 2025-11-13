'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Package } from 'lucide-react';
import KitCard from '@/components/KitCard';

interface CollectionItem {
  id: string;
  kitId: string;
  purchasePrice?: number | null;
  purchaseDate?: string | null;
  notes?: string | null;
  kit: {
    id: string;
    name: string;
    grade: string;
    series?: string | null;
    scale?: string | null;
    imageUrl?: string | null;
  };
}

export default function CollectionPage() {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    try {
      const response = await fetch('/api/collection');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching collection:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCollection = async (kitId: string) => {
    try {
      await fetch(`/api/collection/${kitId}`, { method: 'DELETE' });
      setItems(items.filter((item) => item.kitId !== kitId));
    } catch (error) {
      console.error('Error removing from collection:', error);
    }
  };

  const totalSpent = items.reduce((sum, item) => {
    return sum + (item.purchasePrice || 0);
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-blue-300 text-lg">Loading collection...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">My Collection</h1>
          <p className="text-xl text-blue-200">
            {items.length} {items.length === 1 ? 'kit' : 'kits'} in your collection
          </p>
          {items.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 backdrop-blur-sm">
                <p className="text-sm text-green-200 font-medium">Total Kits</p>
                <p className="text-3xl font-bold text-white">{items.length}</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 backdrop-blur-sm">
                <p className="text-sm text-blue-200 font-medium">Total Spent</p>
                <p className="text-3xl font-bold text-white">
                  ${totalSpent.toFixed(2)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 backdrop-blur-sm">
                <p className="text-sm text-purple-200 font-medium">Average Price</p>
                <p className="text-3xl font-bold text-white">
                  ${items.length > 0 ? (totalSpent / items.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/20 bg-white/10 p-16 text-center backdrop-blur-sm">
            <Package className="mx-auto h-16 w-16 text-gray-500 mb-4" />
            <p className="text-gray-300 mb-4 text-lg">Your collection is empty.</p>
            <Link
              href="/search"
              className="inline-block rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
            >
              Browse kits to add to your collection →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="relative group">
                <KitCard kit={item.kit} />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => removeFromCollection(item.kitId)}
                    className="rounded-full bg-red-600/80 p-2.5 text-white shadow-xl backdrop-blur-sm transition-all hover:bg-red-600 hover:scale-110"
                    title="Remove from collection"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {item.purchasePrice && (
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-green-500/20 backdrop-blur-sm border border-green-500/30 p-3">
                    <p className="text-xs text-green-200 font-medium">Purchased</p>
                    <p className="font-bold text-green-300 text-lg">
                      ${item.purchasePrice.toFixed(2)}
                    </p>
                    {item.purchaseDate && (
                      <p className="text-xs text-green-300/70 mt-1">
                        {new Date(item.purchaseDate).toLocaleDateString()}
                      </p>
                    )}
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