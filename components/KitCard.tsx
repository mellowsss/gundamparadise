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
    <div className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl transition-all hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.03]">
      <Link href={`/kits/${kit.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-slate-900 to-black">
          {kit.imageUrl ? (
            <>
              <Image
                src={kit.imageUrl}
                alt={kit.name}
                width={500}
                height={500}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-24 w-24 text-white/20" />
            </div>
          )}
          
          {/* Grade Badge Overlay */}
          <div className="absolute top-4 left-4 z-10">
            <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-xs font-black text-white shadow-lg">
              {kit.grade}
            </span>
          </div>
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-6">
        {/* Series Badge */}
        {kit.series && (
          <div className="mb-3 text-center">
            <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white/70 backdrop-blur-sm">
              {kit.series}
            </span>
          </div>
        )}
        
        {/* Name */}
        <Link href={`/kits/${kit.id}`}>
          <h3 className="mb-3 text-center line-clamp-2 text-lg font-black text-white transition-colors group-hover:text-blue-400">
            {kit.name}
          </h3>
        </Link>
        
        {/* Scale */}
        {kit.scale && (
          <p className="mb-4 text-center text-xs font-semibold text-white/50">Scale: {kit.scale}</p>
        )}
        
        {/* Price */}
        <div className="mb-5 flex items-center justify-center">
          {kit.currentPrice ? (
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <div className="text-center">
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
            <span className="text-sm font-semibold text-white/40">Price N/A</span>
          )}
        </div>

        {/* Store Links */}
        {kit.storeLinks && kit.storeLinks.length > 0 && (
          <div className="space-y-3 border-t border-white/10 pt-5">
            <p className="text-center text-xs font-black uppercase tracking-wider text-white/50">Buy Now</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {kit.storeLinks.slice(0, 2).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group/link flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600/90 to-purple-600/90 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/50"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  <span>{link.store.name}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover/link:opacity-100" />
                </a>
              ))}
              {kit.storeLinks.length > 2 && (
                <Link
                  href={`/kits/${kit.id}`}
                  className="rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-xs font-bold text-white/70 transition-all hover:bg-white/20 hover:scale-105"
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
