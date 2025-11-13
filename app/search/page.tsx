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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Search Gundam Kits</h1>
          <p className="mt-2 text-lg text-gray-600">Find and track your favorite Gunpla</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by kit name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-lg shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {showFilters && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Grade
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Series
                </label>
                <select
                  value={selectedSeries}
                  onChange={(e) => setSelectedSeries(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading kits...</div>
          </div>
        ) : kits.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <p className="text-gray-500 mb-2">No kits found.</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Found <span className="font-semibold">{kits.length}</span> {kits.length === 1 ? 'kit' : 'kits'}
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