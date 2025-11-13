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
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
      <Link href={`/kits/${kit.id}`}>
        <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {kit.imageUrl ? (
            <Image
              src={kit.imageUrl}
              alt={kit.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-20 w-20 text-gray-300" />
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
            {kit.grade}
          </span>
          {kit.series && (
            <span className="text-xs font-medium text-gray-500">{kit.series}</span>
          )}
        </div>
        
        <Link href={`/kits/${kit.id}`}>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
            {kit.name}
          </h3>
        </Link>
        
        {kit.scale && (
          <p className="mb-3 text-sm text-gray-500">Scale: {kit.scale}</p>
        )}
        
        <div className="mb-4 flex items-center justify-between">
          {kit.currentPrice ? (
            <div className="flex items-center space-x-1">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">
                ${kit.currentPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-sm text-gray-400">Price N/A</span>
          )}
        </div>

        {/* Buy Links */}
        {kit.storeLinks && kit.storeLinks.length > 0 && (
          <div className="space-y-2 border-t border-gray-100 pt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Buy Now</p>
            <div className="flex flex-wrap gap-2">
              {kit.storeLinks.slice(0, 2).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center space-x-1 rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  <ShoppingCart className="h-3 w-3" />
                  <span>{link.store.name}</span>
                </a>
              ))}
              {kit.storeLinks.length > 2 && (
                <Link
                  href={`/kits/${kit.id}`}
                  className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
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