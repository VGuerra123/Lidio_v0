'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShopifyProduct } from '@/lib/types';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const image = product.images.edges[0]?.node;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg">
      <Link href={`/productos/${product.handle}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 animate-pulse" />
          )}

          {image && (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          )}

          {!product.availableForSale && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white font-semibold px-2.5 py-1 rounded-lg text-xs">
              Agotado
            </Badge>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Agregar a favoritos"
          >
            <Heart
              className={`w-4 h-4 transition-all ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/productos/${product.handle}`}>
          {product.productType && (
            <span className="inline-block text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
              {product.productType}
            </span>
          )}

          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-gray-700 transition-colors text-sm leading-tight min-h-[2.5rem]">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between gap-3 mt-3">
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(price)}
            </p>
          </div>

          <Button
            size="icon"
            className="w-9 h-9 rounded-lg bg-gray-900 hover:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
            disabled={!product.availableForSale}
            aria-label="Agregar al carrito"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
