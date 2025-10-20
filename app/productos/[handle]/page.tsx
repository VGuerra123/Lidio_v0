'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.handle}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.handle) {
      fetchProduct();
    }
  }, [params.handle]);

  const handleAddToCart = () => {
    toast.success('Producto agregado al carrito');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Enlace copiado al portapapeles');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Skeleton className="aspect-square rounded-3xl mb-4" />
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-xl" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <Link href="/productos">
            <Button>Volver a productos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.edges || [];
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/productos" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a productos
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 mb-4 shadow-xl">
              {images[selectedImage] && (
                <Image
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 transition-all ${
                      selectedImage === index
                        ? 'border-blue-600 shadow-lg'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={img.node.url}
                      alt={img.node.altText || product.title}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {product.productType && (
              <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600">
                {product.productType}
              </Badge>
            )}

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-4">
              <p className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {formatPrice(price)}
              </p>
            </div>

            {product.description && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}

            <Separator />

            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg h-14"
                disabled={!product.availableForSale}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.availableForSale ? 'Agregar al carrito' : 'No disponible'}
              </Button>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  Favoritos
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <p className="font-semibold">Envío rápido</p>
                  <p className="text-sm text-gray-600">Recíbelo en 2-5 días hábiles</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Garantía extendida</p>
                  <p className="text-sm text-gray-600">12 meses de garantía del fabricante</p>
                </div>
              </div>
            </div>

            {product.descriptionHtml && (
              <>
                <Separator />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Descripción detallada
                  </h2>
                  <div
                    className="prose prose-lg max-w-none text-gray-600"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
