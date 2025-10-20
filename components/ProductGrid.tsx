import ProductCard from './ProductCard';
import { ShopifyProduct } from '@/lib/types';
import { Package } from 'lucide-react';

interface ProductGridProps {
  products: Array<{ node: ShopifyProduct }>;
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mb-6">
          <Package className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No hay productos disponibles</h3>
        <p className="text-gray-600 text-center max-w-md">
          Vuelve pronto para descubrir nuevos productos increíbles
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {products.map(({ node: product }) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
