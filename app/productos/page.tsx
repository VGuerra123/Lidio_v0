'use client';

import { useState, useEffect } from 'react';
import ProductGrid from '@/components/ProductGrid';
import Filters from '@/components/Filters';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleFilterChange = (filters: any) => {
    let filtered = [...products];

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p: any) =>
        filters.categories.includes(p.node.productType)
      );
    }

    if (filters.priceRange) {
      filtered = filtered.filter((p: any) => {
        const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
        return price >= filters.priceRange[0] && price <= filters.priceRange[1];
      });
    }

    if (filters.inStock) {
      filtered = filtered.filter((p: any) => p.node.availableForSale);
    }

    setFilteredProducts(filtered);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredProducts];

    switch (value) {
      case 'price-asc':
        sorted.sort((a: any, b: any) =>
          parseFloat(a.node.priceRange.minVariantPrice.amount) -
          parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case 'price-desc':
        sorted.sort((a: any, b: any) =>
          parseFloat(b.node.priceRange.minVariantPrice.amount) -
          parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      case 'name-asc':
        sorted.sort((a: any, b: any) => a.node.title.localeCompare(b.node.title));
        break;
      case 'name-desc':
        sorted.sort((a: any, b: any) => b.node.title.localeCompare(a.node.title));
        break;
    }

    setFilteredProducts(sorted);
  };

  const categories = Array.from(new Set(products.map((p: any) => p.node.productType))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Todos los productos</h1>
          <p className="text-xl text-cyan-50">
            Descubre nuestra amplia selección de tecnología
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Filters
              categories={categories}
              onFilterChange={handleFilterChange}
            />
          </aside>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {loading ? (
                  <Skeleton className="h-6 w-32" />
                ) : (
                  `${filteredProducts.length} productos encontrados`
                )}
              </p>

              <Select value={sortBy} onValueChange={handleSort}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
                  <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <Skeleton className="aspect-square" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
