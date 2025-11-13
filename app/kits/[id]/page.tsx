'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Package, DollarSign, ExternalLink, Heart, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

interface Kit {
  id: string;
  name: string;
  grade: string;
  series?: string | null;
  scale?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  currentPrice?: number | null;
  averagePrice?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  storeLinks: Array<{
    id: string;
    url: string;
    store: {
      name: string;
      website: string;
    };
  }>;
}

interface PriceEntry {
  id: string;
  price: number;
  recordedAt: string;
}

export default function KitDetailPage() {
  const params = useParams();
  const [kit, setKit] = useState<Kit | null>(null);
  const [priceHistory, setPriceHistory] = useState<PriceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    if (params.id) {
      fetchKit();
      fetchPriceHistory();
    }
  }, [params.id, days]);

  const fetchKit = async () => {
    try {
      const response = await fetch(`/api/kits/${params.id}`);
      const data = await response.json();
      setKit(data);
    } catch (error) {
      console.error('Error fetching kit:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPriceHistory = async () => {
    try {
      const response = await fetch(`/api/kits/${params.id}/prices?days=${days}`);
      const data = await response.json();
      setPriceHistory(data);
    } catch (error) {
      console.error('Error fetching price history:', error);
    }
  };

  const addToWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kitId: kit.id }),
      });
      if (response.ok) {
        alert('Added to wishlist!');
      } else {
        alert('Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add to wishlist');
    }
  };

  const addToCollection = async () => {
    try {
      const response = await fetch('/api/collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kitId: kit.id }),
      });
      if (response.ok) {
        alert('Added to collection!');
      } else {
        alert('Failed to add to collection');
      }
    } catch (error) {
      console.error('Error adding to collection:', error);
      alert('Failed to add to collection');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading kit details...</div>
      </div>
    );
  }

  if (!kit) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Kit not found</div>
      </div>
    );
  }

  const chartData = priceHistory.map((entry) => ({
    date: new Date(entry.recordedAt).toLocaleDateString(),
    price: entry.price,
    fullDate: entry.recordedAt,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
          {kit.imageUrl ? (
            <Image
              src={kit.imageUrl}
              alt={kit.name}
              width={800}
              height={800}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-32 w-32 text-gray-300" />
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="mb-4 flex items-center space-x-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
              {kit.grade}
            </span>
            {kit.series && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {kit.series}
              </span>
            )}
            {kit.scale && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {kit.scale}
              </span>
            )}
          </div>

          <h1 className="mb-4 text-4xl font-bold text-gray-900">{kit.name}</h1>

          {kit.description && (
            <p className="mb-6 text-gray-600">{kit.description}</p>
          )}

          {/* Price Info */}
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Price Information</h2>
            <div className="grid grid-cols-2 gap-4">
              {kit.currentPrice && (
                <div>
                  <div className="text-sm text-gray-500">Current Price</div>
                  <div className="text-2xl font-bold text-green-600">
                    ${kit.currentPrice.toFixed(2)}
                  </div>
                </div>
              )}
              {kit.averagePrice && (
                <div>
                  <div className="text-sm text-gray-500">Average Price</div>
                  <div className="text-2xl font-bold text-gray-700">
                    ${kit.averagePrice.toFixed(2)}
                  </div>
                </div>
              )}
              {kit.minPrice && (
                <div>
                  <div className="text-sm text-gray-500">Lowest Price</div>
                  <div className="text-xl font-semibold text-blue-600">
                    ${kit.minPrice.toFixed(2)}
                  </div>
                </div>
              )}
              {kit.maxPrice && (
                <div>
                  <div className="text-sm text-gray-500">Highest Price</div>
                  <div className="text-xl font-semibold text-red-600">
                    ${kit.maxPrice.toFixed(2)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mb-6 flex space-x-3">
            <button
              onClick={addToWishlist}
              className="flex items-center space-x-2 rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
            >
              <Heart className="h-4 w-4" />
              <span>Add to Wishlist</span>
            </button>
            <button
              onClick={addToCollection}
              className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add to Collection</span>
            </button>
          </div>

          {/* Store Links */}
          {kit.storeLinks.length > 0 && (
            <div>
              <h2 className="mb-3 text-lg font-semibold text-gray-900">Where to Buy</h2>
              <div className="space-y-2">
                {kit.storeLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{link.store.name}</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Price History Chart */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Price History</h2>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={180}>Last 6 months</option>
            <option value={365}>Last year</option>
          </select>
        </div>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center py-12 text-gray-500">
            No price history available
          </div>
        )}
      </div>
    </div>
  );
}
