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
    <Link href={`/kits/${kit.id}`}>
      <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/10">
        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-black">
          {kit.imageUrl ? (
            <Image
              src={kit.imageUrl}
              alt={kit.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-16 w-16 text-white/20" />
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Badges */}
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-400">
              {kit.grade}
            </span>
            {kit.series && (
              <span className="rounded bg-white/10 px-2 py-1 text-xs font-medium text-white/60">
                {kit.series}
              </span>
            )}
          </div>
          
          {/* Name */}
          <h3 className="mb-2 line-clamp-2 text-base font-semibold text-white group-hover:text-white/80">
            {kit.name}
          </h3>
          
          {/* Scale */}
          {kit.scale && (
            <p className="mb-3 text-xs text-white/40">Scale: {kit.scale}</p>
          )}
          
          {/* Price */}
          <div className="mb-3 flex items-center justify-between">
            {kit.currentPrice ? (
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-green-400" />
                <span className="text-xl font-bold text-green-400">
                  ${kit.currentPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-sm text-white/40">Price N/A</span>
            )}
          </div>

          {/* Store Links */}
          {kit.storeLinks && kit.storeLinks.length > 0 && (
            <div className="flex gap-2">
              {kit.storeLinks.slice(0, 2).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 rounded bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 transition-all"
                >
                  <ShoppingCart className="h-3 w-3" />
                  {link.store.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
