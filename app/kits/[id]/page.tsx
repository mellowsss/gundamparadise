'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Package, DollarSign, ExternalLink, Heart, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

  if (!kit) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">Kit not found</p>
          <Link href="/search" className="text-white hover:text-white/80 transition-colors">
            ← Back to search
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
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/search"
          className="mb-6 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="aspect-square w-full overflow-hidden rounded-lg border border-white/10 bg-black">
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
              <div className="flex h-full items-center justify-center">
                <Package className="h-32 w-32 text-white/10" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-2">
              <span className="rounded bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400">
                {kit.grade}
              </span>
              {kit.series && (
                <span className="rounded bg-white/10 px-3 py-1 text-xs font-medium text-white/60">
                  {kit.series}
                </span>
              )}
              {kit.scale && (
                <span className="rounded bg-white/10 px-3 py-1 text-xs font-medium text-white/60">
                  {kit.scale}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-white">{kit.name}</h1>

            {kit.description && (
              <p className="text-lg text-white/60 leading-relaxed">{kit.description}</p>
            )}

            {/* Price Info */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-sm font-medium text-white/60 uppercase tracking-wide">Price Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {kit.currentPrice && (
                  <div>
                    <div className="mb-1 text-xs text-white/40">Current</div>
                    <div className="text-2xl font-bold text-green-400">
                      ${kit.currentPrice.toFixed(2)}
                    </div>
                  </div>
                )}
                {kit.averagePrice && (
                  <div>
                    <div className="mb-1 text-xs text-white/40">Average</div>
                    <div className="text-2xl font-bold text-white">
                      ${kit.averagePrice.toFixed(2)}
                    </div>
                  </div>
                )}
                {kit.minPrice && (
                  <div>
                    <div className="mb-1 text-xs text-white/40">Lowest</div>
                    <div className="text-lg font-semibold text-blue-400">
                      ${kit.minPrice.toFixed(2)}
                    </div>
                  </div>
                )}
                {kit.maxPrice && (
                  <div>
                    <div className="mb-1 text-xs text-white/40">Highest</div>
                    <div className="text-lg font-semibold text-red-400">
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
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                <Heart className="h-4 w-4" />
                Add to Wishlist
              </button>
              <button
                onClick={addToCollection}
                className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-white/90"
              >
                <Plus className="h-4 w-4" />
                Add to Collection
              </button>
            </div>

            {/* Store Links */}
            {kit.storeLinks && kit.storeLinks.length > 0 && (
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-white/60 uppercase tracking-wide">
                  <ShoppingCart className="h-4 w-4" />
                  Where to Buy
                </h2>
                <div className="space-y-2">
                  {kit.storeLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10"
                    >
                      <span className="text-sm font-medium text-white">{link.store.name}</span>
                      <ExternalLink className="h-4 w-4 text-white/40" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price History Chart */}
        <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white/60 uppercase tracking-wide">Price History</h2>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white focus:border-white/20 focus:outline-none transition-all"
            >
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
              <option value={180}>6 months</option>
              <option value={365}>1 year</option>
            </select>
          </div>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center py-12 text-white/40">
              No price history available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
