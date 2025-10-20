import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-600/20 bg-blue-50/50 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Los mejores productos</span>
          </div>

          <h1 className="text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-[1.05] tracking-[-0.03em]">
            Todo lo que necesitas,
            <span className="block mt-2 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 bg-clip-text text-transparent">
              en un solo lugar
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Compra rápido, recibe rápido. La mejor selección con envío express.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/productos" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:scale-[1.02] transition-all duration-200 rounded-full"
              >
                Explorar tienda
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/ofertas" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-semibold text-base rounded-full transition-all duration-200"
              >
                Ver ofertas
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 pt-12 border-t border-gray-100 mt-16">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white"></div>
                ))}
              </div>
              <p className="text-sm font-medium text-gray-700">+2,500 clientes</p>
            </div>
            <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-blue-600 text-blue-600" />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-700">4.9/5 estrellas</p>
            </div>
            <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-sm font-medium text-gray-700">Envío 24-48h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
