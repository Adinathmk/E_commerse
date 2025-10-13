// src/pages/WishlistPage.jsx
import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { Heart, ShoppingBag, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, loading } = useWishlist();
  const { handleAddToCart, isInCart } = useCart();

  const handleAddToCartFromWishlist = async (product) => {
    await handleAddToCart(product);
    toast.success('Product added to cart!');
  };

  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    toast.info(`${productName} removed from wishlist`);
  };

  const handleMoveAllToCart = async () => {
    for (const product of wishlist) {
      await handleAddToCart(product);
    }
    toast.success('All items moved to cart!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-12">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-light text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love to your wishlist. Review them anytime and easily move them to your cart.
            </p>
            <Link
              to="/men"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <button
              onClick={handleMoveAllToCart}
              className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Move All to Cart
            </button>
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <WishlistCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCartFromWishlist}
              onRemove={handleRemoveFromWishlist}
              isInCart={isInCart(product.id)}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-light text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleMoveAllToCart}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Add All to Cart
            </button>
            <Link
              to="/products"
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wishlist Card Component
function WishlistCard({ product, onAddToCart, onRemove, isInCart }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Second Image on Hover */}
        {product.images?.[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={() => onRemove(product.id, product.name)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
          </button>
          
          <Link
            to={`/products/${product.id}`}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Eye className="w-3 h-3" />
          </Link>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3">
          {product.isNewArrival && (
            <span className="bg-black text-white text-xs tracking-wider font-light px-2 py-1 uppercase">
              New
            </span>
          )}
          {product.isTopSelling && !product.isNewArrival && (
            <span className="bg-black text-white text-xs tracking-wider font-light px-2 py-1 uppercase">
              Bestseller
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <button
            onClick={() => onAddToCart(product)}
            className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              isInCart
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-normal text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-light text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {product.discountPercentage && (
            <span className="text-sm text-green-600 font-medium">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
          <span className="capitalize">{product.category}</span>
          {product.rating && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        {/* Stock Status */}
        {product.inStock !== undefined && (
          <div className="mt-2">
            <span className={`text-xs ${
              product.inStock ? 'text-green-600' : 'text-red-600'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}