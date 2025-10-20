'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FiltersProps {
  categories?: string[];
  brands?: string[];
  onFilterChange?: (filters: any) => void;
}

export default function Filters({ categories = [], brands = [], onFilterChange }: FiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);
    setSelectedCategories(newCategories);
    applyFilters(newCategories, selectedBrands, priceRange, inStock);
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...selectedBrands, brand]
      : selectedBrands.filter((b) => b !== brand);
    setSelectedBrands(newBrands);
    applyFilters(selectedCategories, newBrands, priceRange, inStock);
  };

  const applyFilters = (cats: string[], brnds: string[], price: number[], stock: boolean) => {
    if (onFilterChange) {
      onFilterChange({
        categories: cats,
        brands: brnds,
        priceRange: price,
        inStock: stock,
      });
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 5000]);
    setInStock(false);
    if (onFilterChange) {
      onFilterChange({
        categories: [],
        brands: [],
        priceRange: [0, 5000],
        inStock: false,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Limpiar
        </Button>
      </div>

      <Separator className="mb-6" />

      <Accordion type="multiple" defaultValue={['price', 'categories', 'availability']} className="space-y-4">
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            Precio
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange(value);
                  applyFilters(selectedCategories, selectedBrands, value, inStock);
                }}
                max={5000}
                step={50}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {categories.length > 0 && (
          <AccordionItem value="categories" className="border-none">
            <AccordionTrigger className="text-base font-semibold hover:no-underline">
              Categorías
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {brands.length > 0 && (
          <AccordionItem value="brands" className="border-none">
            <AccordionTrigger className="text-base font-semibold hover:no-underline">
              Marcas
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-3">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) =>
                        handleBrandChange(brand, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`brand-${brand}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="availability" className="border-none">
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            Disponibilidad
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={inStock}
                onCheckedChange={(checked) => {
                  setInStock(checked as boolean);
                  applyFilters(selectedCategories, selectedBrands, priceRange, checked as boolean);
                }}
              />
              <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                Solo productos disponibles
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
