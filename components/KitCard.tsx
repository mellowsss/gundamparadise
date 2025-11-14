import Link from 'next/link';
import Image from 'next/image';
import { Package, DollarSign, ShoppingCart, ExternalLink, Star } from 'lucide-react';

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
    <div className="group relative overflow-hidden rounded-3xl border-2 border-indigo-500/20 bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-indigo-950/80 backdrop-blur-xl shadow-2xl transition-all hover:scale-[1.02] hover:border-indigo-400/50 hover:shadow-indigo-500/30">
      <Link href={`/kits/${kit.id}`}>
        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
          {kit.imageUrl ? (
            <Image
              src={kit.imageUrl}
              alt={kit.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-24 w-24 text-indigo-500/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
        </div>
      </Link>
      
      <div className="p-6">
        {/* Grade Badge */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 text-xs font-black text-white shadow-lg">
            {kit.grade}
          </span>
          {kit.series && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300 backdrop-blur-sm">
              {kit.series}
            </span>
          )}
        </div>
        
        {/* Kit Name */}
        <Link href={`/kits/${kit.id}`}>
          <h3 className="mb-3 line-clamp-2 text-xl font-black text-white transition-colors group-hover:text-indigo-400">
            {kit.name}
          </h3>
        </Link>
        
        {/* Scale */}
        {kit.scale && (
          <p className="mb-4 text-sm font-semibold text-slate-400">Scale: {kit.scale}</p>
        )}
        
        {/* Price */}
        <div className="mb-6 flex items-center justify-between">
          {kit.currentPrice ? (
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-emerald-400" />
              <div>
                <span className="text-3xl font-black text-emerald-400">
                  ${kit.currentPrice.toFixed(2)}
                </span>
                {kit.averagePrice && kit.averagePrice !== kit.currentPrice && (
                  <p className="text-xs text-slate-500 line-through">
                    ${kit.averagePrice.toFixed(2)} avg
                  </p>
                )}
              </div>
            </div>
          ) : (
            <span className="text-sm font-semibold text-slate-500">Price N/A</span>
          )}
        </div>

        {/* Buy Links */}
        {kit.storeLinks && kit.storeLinks.length > 0 && (
          <div className="space-y-3 border-t-2 border-white/10 pt-4">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">Buy Now</p>
            <div className="flex flex-wrap gap-2">
              {kit.storeLinks.slice(0, 2).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group/link flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600/80 to-purple-600/80 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/50"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>{link.store.name}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover/link:opacity-100" />
                </a>
              ))}
              {kit.storeLinks.length > 2 && (
                <Link
                  href={`/kits/${kit.id}`}
                  className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-slate-300 transition-all hover:bg-white/20 hover:scale-105"
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