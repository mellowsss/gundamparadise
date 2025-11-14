'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Package, DollarSign, ExternalLink, Heart, Plus, ShoppingCart, ArrowLeft, Star } from 'lucide-react';
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

  useEffect(() => {
    if (params.id) {
      fetchKit();
      fetchPriceHistory();
    }
  }, [params.id]);

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
      const response = await fetch(`/api/kits/${params.id}/prices?days=30`);
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
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
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
      }
    } catch (error) {
      console.error('Error adding to collection:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-10 w-10 animate-spin rounded-full border-3 border-white/20 border-t-blue-500"></div>
          <p className="text-sm font-medium text-white/60">Loading Gundam...</p>
        </div>
      </div>
    );
  }

  if (!kit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-white/20" />
          <p className="mb-2 text-xl font-bold text-white">Gundam not found</p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  const chartData = priceHistory.map((entry) => ({
    date: new Date(entry.recordedAt).toLocaleDateString(),
    price: entry.price,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/search"
          className="mb-6 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="aspect-square w-full overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-slate-900 to-black">
            {kit.imageUrl ? (
              <Image
                src={kit.imageUrl}
                alt={kit.name}
                width={800}
                height={800}
                className="h-full w-full object-cover"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Package className="h-32 w-32 text-white/20" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-black text-white shadow-lg">
                {kit.grade}
              </span>
              {kit.series && (
                <span className="rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold text-white/70 backdrop-blur-sm">
                  {kit.series}
                </span>
              )}
              {kit.scale && (
                <span className="rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold text-white/70 backdrop-blur-sm">
                  {kit.scale}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-black text-white sm:text-5xl">{kit.name}</h1>

            {kit.description && (
              <p className="text-lg text-white/70 leading-relaxed">{kit.description}</p>
            )}

            {/* Price Info */}
            <div className="rounded-xl border-2 border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-bold text-white">Pricing</h2>
              <div className="space-y-3">
                {kit.currentPrice && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Current Price</span>
                    <span className="text-3xl font-black text-green-400">
                      ${kit.currentPrice.toFixed(2)}
                    </span>
                  </div>
                )}
                {kit.averagePrice && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Average Price</span>
                    <span className="text-xl font-bold text-white/80">
                      ${kit.averagePrice.toFixed(2)}
                    </span>
                  </div>
                )}
                {kit.minPrice && kit.maxPrice && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Price Range</span>
                    <span className="text-white/80">
                      ${kit.minPrice.toFixed(2)} - ${kit.maxPrice.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={addToWishlist}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-pink-500/50"
              >
                <Heart className="h-5 w-5" />
                Add to Wishlist
              </button>
              <button
                onClick={addToCollection}
                className="flex items-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-3 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
              >
                <Plus className="h-5 w-5" />
                Add to Collection
              </button>
            </div>

            {/* Store Links */}
            {kit.storeLinks && kit.storeLinks.length > 0 && (
              <div className="rounded-xl border-2 border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="mb-4 text-xl font-bold text-white">Where to Buy</h2>
                <div className="space-y-2">
                  {kit.storeLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-600/80 to-purple-600/80 px-4 py-3 font-bold text-white transition-all hover:scale-105 hover:from-blue-500 hover:to-purple-500"
                    >
                      <span className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        {link.store.name}
                      </span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price History Chart */}
        {chartData.length > 0 && (
          <div className="mt-12 rounded-xl border-2 border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-bold text-white">Price History</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={{ fill: '#60a5fa', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
