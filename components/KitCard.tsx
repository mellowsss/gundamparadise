import Link from 'next/link';
import Image from 'next/image';
import { Package, DollarSign } from 'lucide-react';

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
  };
}

export default function KitCard({ kit }: KitCardProps) {
  return (
    <Link
      href={`/kits/${kit.id}`}
      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        {kit.imageUrl ? (
          <Image
            src={kit.imageUrl}
            alt={kit.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-16 w-16 text-gray-300" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
            {kit.grade}
          </span>
          {kit.series && (
            <span className="text-xs text-gray-500">{kit.series}</span>
          )}
        </div>
        <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 group-hover:text-blue-600">
          {kit.name}
        </h3>
        {kit.scale && (
          <p className="mb-2 text-sm text-gray-500">Scale: {kit.scale}</p>
        )}
        <div className="flex items-center justify-between">
          {kit.currentPrice ? (
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-bold text-green-600">
                ${kit.currentPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-sm text-gray-400">No price data</span>
          )}
          {kit.averagePrice && kit.currentPrice && (
            <span className="text-xs text-gray-500">
              Avg: ${kit.averagePrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
