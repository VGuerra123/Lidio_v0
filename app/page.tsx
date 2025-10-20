import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const revalidate = 3600;

export default async function Home() {
  let products = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      <Hero />

      <FeaturedCategories />

      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Productos destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección de productos más populares y mejor valorados
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <>
              <ProductGrid products={featuredProducts} />
              <div className="text-center mt-12">
                <Link href="/productos">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Ver todos los productos
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-600 text-lg mb-4">
                Configura tu tienda Shopify para ver productos aquí
              </p>
              <p className="text-sm text-gray-500">
                Actualiza las variables de entorno NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN y NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-cyan-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                ¿Necesitas ayuda?
              </h2>
              <p className="text-xl text-cyan-50 mb-8">
                Nuestro equipo está disponible para ayudarte a encontrar el producto perfecto para tus necesidades.
              </p>
              <Link href="/contacto">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Contáctanos
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <p className="text-4xl font-bold mb-2">24/7</p>
                <p className="text-cyan-50">Soporte disponible</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <p className="text-4xl font-bold mb-2">+1000</p>
                <p className="text-cyan-50">Productos disponibles</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <p className="text-4xl font-bold mb-2">98%</p>
                <p className="text-cyan-50">Clientes satisfechos</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <p className="text-4xl font-bold mb-2">2-5</p>
                <p className="text-cyan-50">Días de envío</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
