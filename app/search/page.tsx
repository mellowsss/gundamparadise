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
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-5xl font-black text-white sm:text-6xl">
            Search <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Gundams</span>
          </h1>
          <p className="text-xl text-white/60">Find and track your favorite Gunpla model kits</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search by kit name, grade, or series..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border-2 border-white/10 bg-white/5 py-4 pl-14 pr-6 text-lg text-white placeholder-white/40 backdrop-blur-sm focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-bold transition-all ${
              showFilters
                ? 'border-blue-500/50 bg-blue-500/20 text-blue-300'
                : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10'
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 rounded-xl border-2 border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500/20 transition-all"
            >
              <X className="h-4 w-4" />
              Clear All
            </button>
          )}

          {kits.length > 0 && !loading && (
            <div className="ml-auto rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/80">
              {kits.length} {kits.length === 1 ? 'kit' : 'kits'} found
            </div>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8 rounded-xl border-2 border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-bold text-white">
                  Grade
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full rounded-lg border-2 border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
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
                <label className="mb-3 block text-sm font-bold text-white">
                  Series
                </label>
                <select
                  value={selectedSeries}
                  onChange={(e) => setSelectedSeries(e.target.value)}
                  className="w-full rounded-lg border-2 border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
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
            <div className="text-center">
              <div className="mb-4 inline-block h-10 w-10 animate-spin rounded-full border-3 border-white/20 border-t-white"></div>
              <p className="text-sm font-medium text-white/60">Loading Gundams...</p>
            </div>
          </div>
        ) : kits.length === 0 ? (
          <div className="rounded-xl border-2 border-white/10 bg-white/5 p-20 text-center backdrop-blur-sm">
            <p className="mb-2 text-xl font-bold text-white">No kits found</p>
            <p className="text-sm text-white/60">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {kits.map((kit) => (
              <KitCard key={kit.id} kit={kit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
