// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch user and cart on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
      fetchCart(user.id);
    }
  }, []);

  const fetchCart = async (userId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/users/${userId}`);
      setCart(response.data.cart || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // Background cart sync (non-blocking)
  // --------------------------
  const syncCart = async (updatedCart) => {
    if (!currentUser) return;
    try {
      await axiosInstance.patch(`/users/${currentUser.id}`, { cart: updatedCart });
    } catch (error) {
      console.error('Cart sync failed:', error);
      toast.error('Sync failed. Changes may not be saved.');
    }
  };

  // Debounce to avoid multiple rapid API calls
  const debouncedSync = useCallback(debounce(syncCart, 300), [currentUser]);

  // --------------------------
  // Cart actions
  // --------------------------
  const addToCart = (product, quantity = 1) => {
    if (!currentUser) {
      toast.error('Please login to add items to cart');
      return;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      let updatedCart;

      if (existingIndex > -1) {
        updatedCart = prevCart.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        const cartItem = { ...product, quantity, addedAt: new Date().toISOString() };
        updatedCart = [...prevCart, cartItem];
      }

      debouncedSync(updatedCart); // Sync with server in background
      return updatedCart;
    });

    // Show toast outside of setCart to prevent duplicate renders
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      toast.info(`Quantity increased to ${existingItem.quantity + quantity}`);
    } else {
      toast.success('Product added to cart!');
    }
  };

  const removeFromCart = (productId) => {
    if (!currentUser) return;

    // Show toast before state update
    toast.success('Product removed from cart');
    
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      debouncedSync(updatedCart); // Sync in background
      return updatedCart;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (!currentUser) return;

    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      debouncedSync(updatedCart); // Background sync
      return updatedCart;
    });
  };

  const clearCart = () => {
    if (!currentUser) return;

    // Show toast before state update
    toast.success('Cart cleared');
    
    setCart([]);
    debouncedSync([]); // Background sync
  };

  // --------------------------
  // Cart utilities
  // --------------------------
  const isInCart = (productId) => cart.some(item => item.id === productId);
  const getCartItem = (productId) => cart.find(item => item.id === productId);
  const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);
  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // NEW: Function to get quantity of a specific item in cart
  const getCartItemCount = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product) => addToCart(product, 1);
  const refreshCart = () => currentUser && fetchCart(currentUser.id);

  // --------------------------
  // Context value
  // --------------------------
  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItem,
    getCartCount,
    getCartTotal,
    getCartItemCount, // Added missing function
    handleAddToCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};