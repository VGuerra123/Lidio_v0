import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16 sm:mt-20 lg:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white font-black">
                L
              </div>
              <span className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                Lidio
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm sm:text-base">
              Tu tienda de confianza. Productos de calidad con envío rápido y la mejor atención.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm sm:text-base">Compra</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/productos"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Categorías
                </Link>
              </li>
              <li>
                <Link
                  href="/ofertas"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Ofertas especiales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm sm:text-base">Ayuda</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/envios"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Envíos
                </Link>
              </li>
              <li>
                <Link
                  href="/devoluciones"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  href="/preguntas-frecuentes"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm sm:text-base">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/nosotros"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Lidio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
