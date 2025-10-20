import Link from 'next/link';
import { Laptop, Smartphone, Headphones, Watch, Camera, Gamepad, Tablet, Monitor, Keyboard, Speaker, Printer, Mouse } from 'lucide-react';

const categories = [
  {
    name: 'Laptops',
    icon: Laptop,
    href: '/productos?categoria=laptops',
    description: 'Portátiles de última generación',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Smartphones',
    icon: Smartphone,
    href: '/productos?categoria=smartphones',
    description: 'Los mejores teléfonos inteligentes',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Audio',
    icon: Headphones,
    href: '/productos?categoria=audio',
    description: 'Auriculares y altavoces premium',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Wearables',
    icon: Watch,
    href: '/productos?categoria=wearables',
    description: 'Smartwatches y dispositivos vestibles',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Cámaras',
    icon: Camera,
    href: '/productos?categoria=camaras',
    description: 'Cámaras profesionales y accesorios',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Gaming',
    icon: Gamepad,
    href: '/productos?categoria=gaming',
    description: 'Equipamiento para gamers',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Tablets',
    icon: Tablet,
    href: '/productos?categoria=tablets',
    description: 'Tabletas para trabajo y entretenimiento',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Monitores',
    icon: Monitor,
    href: '/productos?categoria=monitores',
    description: 'Pantallas de alta resolución',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Teclados',
    icon: Keyboard,
    href: '/productos?categoria=teclados',
    description: 'Teclados mecánicos y gaming',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Altavoces',
    icon: Speaker,
    href: '/productos?categoria=altavoces',
    description: 'Sistemas de sonido envolvente',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Impresoras',
    icon: Printer,
    href: '/productos?categoria=impresoras',
    description: 'Impresoras multifunción',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Ratones',
    icon: Mouse,
    href: '/productos?categoria=ratones',
    description: 'Ratones ergonómicos y gaming',
    color: 'from-blue-500 to-cyan-500',
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Categorías</h1>
          <p className="text-xl text-cyan-50">
            Explora nuestra amplia gama de productos tecnológicos
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
