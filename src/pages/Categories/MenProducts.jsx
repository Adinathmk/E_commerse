import React, { useState, useEffect } from "react";
import { X, Filter } from "lucide-react";
import ProductFilter from "../../components/ProductFilter";
import ProductGrid from "../../components/ProductGrid";
import { useProducts } from "../../contexts/ProductContext";

export default function MenProducts() {
  const { products, loading, error } = useProducts();
  const [menProducts, setMenProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const maleProducts = products.filter((p) => p.categoryType === "male");
      setMenProducts(maleProducts);
      setFilteredProducts(maleProducts);
    }
  }, [products]);

  // Prevent body scroll when filter is open on mobile
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFilterOpen]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-gray-500 text-lg">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-8xl mx-auto">
        <div className="lg:flex lg:gap-12 px-6 lg:px-12 py-12">
          {/* === Filter Sidebar (Desktop) === */}
          <aside className="hidden lg:block w-80 flex-shrink-0">            
            <div className="sticky top-32">
              <ProductFilter
                products={menProducts}
                onFilter={setFilteredProducts}
              />
            </div>
          </aside>

          {/* === Main Content === */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-0">
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-2xl text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
              >
                <Filter size={20} />
                <span className="font-medium">Filters</span>
              </button>
            </div>

            {/* Product Grid - Hidden on mobile when filter is open */}
            <div className={`${isFilterOpen ? 'hidden lg:block' : 'block'}`}>
               <div>
                <h1 className="text-3xl font-light text-gray-900 mb-5 text-center">Men's Collection</h1>
              </div>
              <ProductGrid products={filteredProducts} />
            </div>
          </main>
        </div>
      </div>

      {/* === Mobile Filter Overlay === */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 lg:hidden ${
          isFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Background Overlay */}
        <div
          onClick={() => setIsFilterOpen(false)}
          className={`absolute inset-0 bg-black transition-all duration-500 ${
            isFilterOpen ? "bg-opacity-50" : "bg-opacity-0"
          }`}
        ></div>

        {/* Filter Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white transform transition-transform duration-500 ease-out ${
            isFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p- border-b border-gray-100">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-300"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto scrollbar-none">
              <div className="pl-20">
                <ProductFilter 
                  products={menProducts} 
                  onFilter={setFilteredProducts}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
