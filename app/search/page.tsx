'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import KitCard from '@/components/KitCard';

const GRADES = ['HG', 'RG', 'MG', 'PG', 'SD', 'EG', 'FM', 'RE/100'];
const SERIES = ['UC', 'SEED', '00', 'Wing', 'G', 'X', 'AGE', 'IBO', 'Build Fighters', 'Other'];

interface Kit {
  id: string;
  name: string;
  grade: string;
  series?: string | null;
  scale?: string | null;
  imageUrl?: string | null;
  currentPrice?: number | null;
  averagePrice?: number | null;
  storeLinks?: Array<{
    id: string;
    url: string;
    store: {
      name: string;
      website: string;
    };
  }>;
}

export default function SearchPage() {
  const [kits, setKits] = useState<Kit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchKits();
  }, [search, selectedGrade, selectedSeries]);

  const fetchKits = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedGrade) params.append('grade', selectedGrade);
      if (selectedSeries) params.append('series', selectedSeries);

      const response = await fetch(`/api/kits?${params.toString()}`);
      const data = await response.json();
      setKits(data.kits || []);
    } catch (error) {
      console.error('Error fetching kits:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedGrade('');
    setSelectedSeries('');
  };

  const hasActiveFilters = search || selectedGrade || selectedSeries;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Search Gundam Kits</h1>
          <p className="text-xl text-blue-200">Find and track your favorite Gunpla</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by kit name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/10 py-5 pl-14 pr-4 text-lg text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 rounded-xl bg-red-500/20 px-5 py-2.5 text-sm font-medium text-red-300 hover:bg-red-500/30 transition-all"
            >
              <X className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {showFilters && (
          <div className="mb-6 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Grade
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                >
                  <option value="">All Grades</option>
                  {GRADES.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Series
                </label>
                <select
                  value={selectedSeries}
                  onChange={(e) => setSelectedSeries(e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                >
                  <option value="">All Series</option>
                  {SERIES.map((series) => (
                    <option key={series} value={series}>
                      {series}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-blue-300 text-lg">Loading kits...</div>
          </div>
        ) : kits.length === 0 ? (
          <div className="rounded-2xl border border-white/20 bg-white/10 p-16 text-center backdrop-blur-sm">
            <p className="text-gray-300 mb-2 text-lg">No kits found.</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-blue-200">
              Found <span className="font-semibold text-white">{kits.length}</span> {kits.length === 1 ? 'kit' : 'kits'}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {kits.map((kit) => (
                <KitCard key={kit.id} kit={kit} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}