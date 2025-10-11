import { Heart, ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="group relative bg-white overflow-hidden hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Heart className="w-5 h-5 text-gray-800 hover:fill-gray-800 transition" />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-auto">
        {/* First Image */}
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-0"
        />
        {/* Second Image (shown on hover) */}
        {product.images?.[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Badges */}
        {(product.isNewArrival || product.isTopSelling) && (
          <div className="absolute top-4 left-4">
            {product.isNewArrival && (
              <span className="bg-black text-white text-xs tracking-wider font-light px-3 py-1.5 uppercase">
                New
              </span>
            )}
            {product.isTopSelling && !product.isNewArrival && (
              <span className="bg-black text-white text-xs tracking-wider font-light px-3 py-1.5 uppercase">
                Bestseller
              </span>
            )}
          </div>
        )}

        {/* Hover Add to Cart */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-black/90 backdrop-blur-sm text-white py-4 flex items-center justify-center gap-2 hover:bg-black transition-colors">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm tracking-wide font-light">Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-4 pb-2 space-y-2">
        {/* Product Name */}
        <h3 className="text-base font-normal text-gray-900 leading-tight">
          {product.name}
        </h3>

        {/* Price and Color */}
        <div className="flex items-baseline justify-between pt-1">
          <span className="text-lg font-light text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400 font-light capitalize">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}
