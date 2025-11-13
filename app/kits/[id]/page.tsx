'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Package, DollarSign, ExternalLink, Heart, Plus, ShoppingCart } from 'lucide-react';
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
  storeLinks?: Array<{
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
    if (!kit) return;
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
    if (!kit) return;
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-blue-300 text-lg">Loading kit details...</div>
      </div>
    );
  }

  if (!kit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 mb-4 text-lg">Kit not found</p>
          <Link href="/search" className="text-blue-400 hover:text-blue-300 transition-colors">
            Browse all kits →
          </Link>
        </div>
      </div>
    );
  }

  const chartData = priceHistory.map((entry) => ({
    date: new Date(entry.recordedAt).toLocaleDateString(),
    price: entry.price,
    fullDate: entry.recordedAt,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="aspect-square w-full overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 shadow-2xl backdrop-blur-sm">
            {kit.imageUrl ? (
              <Image
                src={kit.imageUrl}
                alt={kit.name}
                width={800}
                height={800}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <Package className="h-32 w-32 text-gray-300" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-bold text-white">
                {kit.grade}
              </span>
              {kit.series && (
                <span className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
                  {kit.series}
                </span>
              )}
              {kit.scale && (
                <span className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
                  {kit.scale}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-white">{kit.name}</h1>

            {kit.description && (
              <p className="text-lg text-blue-200 leading-relaxed">{kit.description}</p>
            )}

            {/* Price Info */}
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-lg font-semibold text-white">Price Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {kit.currentPrice && (
                  <div>
                    <div className="text-sm font-medium text-blue-200">Current Price</div>
                    <div className="text-3xl font-bold text-green-400">
                      ${kit.currentPrice.toFixed(2)}
                    </div>
                  </div>
                )}
                {kit.averagePrice && (
                  <div>
                    <div className="text-sm font-medium text-blue-200">Average Price</div>
                    <div className="text-3xl font-bold text-white">
                      ${kit.averagePrice.toFixed(2)}
                    </div>
                  </div>
                )}
                {kit.minPrice && (
                  <div>
                    <div className="text-sm font-medium text-blue-200">Lowest</div>
                    <div className="text-xl font-semibold text-blue-400">
                      ${kit.minPrice.toFixed(2)}
                    </div>
                  </div>
                )}
                {kit.maxPrice && (
                  <div>
                    <div className="text-sm font-medium text-blue-200">Highest</div>
                    <div className="text-xl font-semibold text-red-400">
                      ${kit.maxPrice.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={addToWishlist}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-3 font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-pink-500/50"
              >
                <Heart className="h-5 w-5" />
                <span>Add to Wishlist</span>
              </button>
              <button
                onClick={addToCollection}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-blue-500/50"
              >
                <Plus className="h-5 w-5" />
                <span>Add to Collection</span>
              </button>
            </div>

            {/* Store Links */}
            {kit.storeLinks && kit.storeLinks.length > 0 && (
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <h2 className="mb-4 flex items-center text-lg font-semibold text-white">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Where to Buy
                </h2>
                <div className="space-y-3">
                  {kit.storeLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border-2 border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <div className="flex items-center space-x-3">
                        <ShoppingCart className="h-5 w-5 text-blue-400" />
                        <span className="font-semibold text-white">{link.store.name}</span>
                      </div>
                      <ExternalLink className="h-5 w-5 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price History Chart */}
        <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Price History</h2>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
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
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center py-12 text-gray-400">
              No price history available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}