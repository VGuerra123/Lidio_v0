import { Badge } from '@/components/ui/badge';
import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/shopify';

export const revalidate = 3600;

export default async function OffersPage() {
  let products = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  const offerProducts = products.filter((p: any) =>
    p.node.tags.some((tag: string) => tag.toLowerCase().includes('oferta') || tag.toLowerCase().includes('descuento'))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Badge className="bg-white text-blue-600 mb-4">Ofertas especiales</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Descuentos increíbles
          </h1>
          <p className="text-xl text-cyan-50">
            Aprovecha nuestras mejores ofertas en tecnología de última generación
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {offerProducts.length > 0 ? (
          <>
            <div className="mb-8">
              <p className="text-lg text-gray-600">
                {offerProducts.length} productos en oferta
              </p>
            </div>
            <ProductGrid products={offerProducts} />
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No hay ofertas disponibles en este momento
            </h2>
            <p className="text-gray-600 mb-8">
              Vuelve pronto para ver nuestras próximas ofertas especiales
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
