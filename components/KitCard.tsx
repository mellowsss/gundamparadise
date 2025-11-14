import Link from 'next/link';
import Image from 'next/image';
import { Package, DollarSign, ShoppingCart, ExternalLink } from 'lucide-react';

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
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:shadow-white/5">
      <Link href={`/kits/${kit.id}`}>
        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-slate-900 to-black">
          {kit.imageUrl ? (
            <Image
              src={kit.imageUrl}
              alt={kit.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-20 w-20 text-white/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-5">
        {/* Badges */}
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-gradient-to-r from-blue-500/30 to-blue-600/30 border border-blue-500/50 px-3 py-1 text-xs font-bold text-blue-300 backdrop-blur-sm">
            {kit.grade}
          </span>
          {kit.series && (
            <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
              {kit.series}
            </span>
          )}
        </div>
        
        {/* Name */}
        <Link href={`/kits/${kit.id}`}>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-blue-400">
            {kit.name}
          </h3>
        </Link>
        
        {/* Scale */}
        {kit.scale && (
          <p className="mb-3 text-xs font-medium text-white/50">Scale: {kit.scale}</p>
        )}
        
        {/* Price */}
        <div className="mb-4 flex items-center justify-between">
          {kit.currentPrice ? (
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <div>
                <span className="text-2xl font-black text-green-400">
                  ${kit.currentPrice.toFixed(2)}
                </span>
                {kit.averagePrice && kit.averagePrice !== kit.currentPrice && (
                  <p className="text-xs text-white/40 line-through">
                    ${kit.averagePrice.toFixed(2)} avg
                  </p>
                )}
              </div>
            </div>
          ) : (
            <span className="text-sm font-medium text-white/40">Price N/A</span>
          )}
        </div>

        {/* Store Links */}
        {kit.storeLinks && kit.storeLinks.length > 0 && (
          <div className="space-y-2 border-t border-white/10 pt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-white/50">Buy Now</p>
            <div className="flex flex-wrap gap-2">
              {kit.storeLinks.slice(0, 2).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group/link flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600/80 to-purple-600/80 px-3 py-2 text-xs font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/50"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  <span>{link.store.name}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover/link:opacity-100" />
                </a>
              ))}
              {kit.storeLinks.length > 2 && (
                <Link
                  href={`/kits/${kit.id}`}
                  className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-xs font-bold text-white/70 transition-all hover:bg-white/20 hover:scale-105"
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
