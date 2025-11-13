'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
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
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading collection...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Collection</h1>
        <p className="mt-2 text-gray-600">
          {items.length} {items.length === 1 ? 'kit' : 'kits'} in your collection
        </p>
        {items.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-sm text-gray-600">Total Kits</p>
              <p className="text-2xl font-bold text-green-600">{items.length}</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-blue-600">
                ${totalSpent.toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4">
              <p className="text-sm text-gray-600">Average Price</p>
              <p className="text-2xl font-bold text-purple-600">
                ${items.length > 0 ? (totalSpent / items.length).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-500 mb-4">Your collection is empty.</p>
          <Link
            href="/search"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Browse kits to add to your collection →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="relative">
              <KitCard kit={item.kit} />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => removeFromCollection(item.kitId)}
                  className="rounded-full bg-red-500 p-2 text-white shadow-lg hover:bg-red-600"
                  title="Remove from collection"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {item.purchasePrice && (
                <div className="mt-2 rounded-lg bg-green-50 p-2 text-center">
                  <p className="text-xs text-gray-600">Purchased</p>
                  <p className="font-semibold text-green-600">
                    ${item.purchasePrice.toFixed(2)}
                  </p>
                  {item.purchaseDate && (
                    <p className="text-xs text-gray-500">
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
  );
}
