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
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-white sm:text-5xl">
            Search Kits
          </h1>
          <p className="text-lg text-white/60">Find your next Gunpla</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search by name, grade, or series..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-white/40 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
              showFilters
                ? 'border-white/20 bg-white/10 text-white'
                : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-all"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          )}

          {kits.length > 0 && !loading && (
            <div className="ml-auto text-sm text-white/60">
              {kits.length} {kits.length === 1 ? 'kit' : 'kits'} found
            </div>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Grade
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
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
                <label className="mb-2 block text-sm font-medium text-white">
                  Series
                </label>
                <select
                  value={selectedSeries}
                  onChange={(e) => setSelectedSeries(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
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
              <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
              <p className="text-sm text-white/60">Loading...</p>
            </div>
          </div>
        ) : kits.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-16 text-center">
            <p className="mb-2 text-lg font-medium text-white">No kits found</p>
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
