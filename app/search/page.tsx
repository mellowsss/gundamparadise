'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X, Grid3x3, List } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-6xl font-black text-white sm:text-7xl">
            Search <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Gundam Kits</span>
          </h1>
          <p className="text-2xl text-slate-400">Find and track your favorite Gunpla</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 h-7 w-7 -translate-y-1/2 text-indigo-400" />
            <input
              type="text"
              placeholder="Search by kit name, grade, or series..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border-2 border-indigo-500/30 bg-white/5 py-6 pl-16 pr-6 text-lg text-white placeholder-slate-500 backdrop-blur-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-3 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all ${
              showFilters
                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
            } backdrop-blur-xl`}
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-3 rounded-xl border-2 border-red-500/30 bg-red-500/10 px-6 py-3 text-sm font-bold text-red-300 hover:bg-red-500/20 transition-all backdrop-blur-xl"
            >
              <X className="h-5 w-5" />
              <span>Clear All</span>
            </button>
          )}

          {kits.length > 0 && (
            <div className="ml-auto rounded-xl bg-indigo-500/20 border border-indigo-500/30 px-6 py-3 text-sm font-bold text-indigo-300 backdrop-blur-xl">
              {kits.length} {kits.length === 1 ? 'kit' : 'kits'} found
            </div>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8 rounded-3xl border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 backdrop-blur-xl shadow-2xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-base font-bold text-white">
                  Grade
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full rounded-xl border-2 border-white/20 bg-white/10 px-5 py-3 text-base font-semibold text-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all backdrop-blur-xl"
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
                <label className="mb-3 block text-base font-bold text-white">
                  Series
                </label>
                <select
                  value={selectedSeries}
                  onChange={(e) => setSelectedSeries(e.target.value)}
                  className="w-full rounded-xl border-2 border-white/20 bg-white/10 px-5 py-3 text-base font-semibold text-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all backdrop-blur-xl"
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
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
              <p className="text-xl font-semibold text-indigo-300">Loading kits...</p>
            </div>
          </div>
        ) : kits.length === 0 ? (
          <div className="rounded-3xl border-2 border-white/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-20 text-center backdrop-blur-xl">
            <div className="mb-6 inline-flex rounded-full bg-indigo-500/20 p-4">
              <Search className="h-12 w-12 text-indigo-400" />
            </div>
            <p className="mb-2 text-2xl font-bold text-white">No kits found</p>
            <p className="text-lg text-slate-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {kits.map((kit) => (
              <KitCard key={kit.id} kit={kit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}