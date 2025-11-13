import Link from 'next/link';
import Image from 'next/image';
import { Package, DollarSign, ShoppingCart } from 'lucide-react';

interface KitCardProps {
  kit: {
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
  };
}

export default function KitCard({ kit }: KitCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm shadow-xl transition-all hover:scale-105 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20">
      <Link href={`/kits/${kit.id}`}>
        <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800">
          {kit.imageUrl ? (
            <Image
              src={kit.imageUrl}
              alt={kit.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-20 w-20 text-slate-500" />
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
            {kit.grade}
          </span>
          {kit.series && (
            <span className="text-xs font-medium text-gray-400">{kit.series}</span>
          )}
        </div>
        
        <Link href={`/kits/${kit.id}`}>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-blue-400">
            {kit.name}
          </h3>
        </Link>
        
        {kit.scale && (
          <p className="mb-4 text-sm text-gray-400">Scale: {kit.scale}</p>
        )}
        
        <div className="mb-4 flex items-center justify-between">
          {kit.currentPrice ? (
            <div className="flex items-center space-x-1">
              <DollarSign className="h-5 w-5 text-green-400" />
              <span className="text-2xl font-bold text-green-400">
                ${kit.currentPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-sm text-gray-500">Price N/A</span>
          )}
        </div>

        {/* Buy Links */}
        {kit.storeLinks && kit.storeLinks.length > 0 && (
          <div className="space-y-2 border-t border-white/10 pt-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Buy Now</p>
            <div className="flex flex-wrap gap-2">
              {kit.storeLinks.slice(0, 2).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center space-x-1 rounded-lg bg-blue-600/20 px-3 py-1.5 text-xs font-medium text-blue-300 hover:bg-blue-600/30 transition-all hover:scale-105"
                >
                  <ShoppingCart className="h-3 w-3" />
                  <span>{link.store.name}</span>
                </a>
              ))}
              {kit.storeLinks.length > 2 && (
                <Link
                  href={`/kits/${kit.id}`}
                  className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-white/20 transition-all"
                >
                  +{kit.storeLinks.length - 2} more
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}