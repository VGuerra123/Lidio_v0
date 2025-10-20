'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-gray-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8 lg:gap-12">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-xl font-bold text-gray-900 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                L
              </div>
              <span className="hidden sm:inline">Lidio</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/productos"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              >
                Productos
              </Link>
              <Link
                href="/categorias"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              >
                Categorías
              </Link>
              <Link
                href="/ofertas"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              >
                Ofertas
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link href="/carrito">
              <button className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="py-3 border-t border-gray-100">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-full pl-10 h-11 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col p-3 gap-1 max-w-7xl mx-auto">
            <Link
              href="/productos"
              className="px-3 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all font-medium text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Productos
            </Link>
            <Link
              href="/categorias"
              className="px-3 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all font-medium text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categorías
            </Link>
            <Link
              href="/ofertas"
              className="px-3 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all font-medium text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ofertas
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
