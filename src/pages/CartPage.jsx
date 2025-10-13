// src/components/CartPage.jsx
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal,
    loading 
  } = useCart();

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-light text-gray-600">Your cart is empty</h2>
        <p className="text-gray-400 mt-2">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light">
          Shopping Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)
        </h1>
        <button
          onClick={clearCart}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              
              <div className="flex-1">
                <h3 className="font-normal text-gray-900">{item.name}</h3>
                <p className="text-lg font-light text-gray-900 mt-1">
                  ₹{item.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity} × ₹{item.price.toLocaleString()} = ₹{(item.quantity * item.price).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit">
          <h2 className="text-xl font-light mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Items ({cart.reduce((total, item) => total + item.quantity, 0)})</span>
              <span>₹{getCartTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (18%)</span>
              <span>₹{(getCartTotal() * 0.18).toLocaleString()}</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>₹{(getCartTotal() * 1.18).toLocaleString()}</span>
            </div>
          </div>

          <button className="w-full bg-black text-white py-3 rounded mt-6 hover:bg-gray-800 transition-colors font-medium">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}