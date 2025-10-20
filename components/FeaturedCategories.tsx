import Link from 'next/link';
import { Laptop, Smartphone, Headphones, Watch, Camera, Gamepad } from 'lucide-react';

const categories = [
  { name: 'Laptops', icon: Laptop, href: '/categorias/laptops' },
  { name: 'Smartphones', icon: Smartphone, href: '/categorias/smartphones' },
  { name: 'Audio', icon: Headphones, href: '/categorias/audio' },
  { name: 'Wearables', icon: Watch, href: '/categorias/wearables' },
  { name: 'Cámaras', icon: Camera, href: '/categorias/camaras' },
  { name: 'Gaming', icon: Gamepad, href: '/categorias/gaming' },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-[-0.02em]">
            Categorías populares
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Todo lo que necesitas en un solo lugar
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-xl bg-white p-5 sm:p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gray-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-gray-900 text-center">
                    {category.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
