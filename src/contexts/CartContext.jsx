// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

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

  const addToCart = async (product, quantity = 1) => {
    if (!currentUser) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      setLoading(true);
      
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      let updatedCart;

      if (existingItemIndex > -1) {
        // Increase quantity if product exists
        updatedCart = cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.info(`Quantity increased to ${updatedCart[existingItemIndex].quantity}`);
      } else {
        // Add new product to cart
        const cartItem = {
          ...product,
          quantity: quantity,
          addedAt: new Date().toISOString()
        };
        updatedCart = [...cart, cartItem];
        toast.success('Product added to cart!');
      }

      setCart(updatedCart);

      await axiosInstance.patch(`/users/${currentUser.id}`, {
        cart: updatedCart
      });

    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart');
      setCart(cart);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!currentUser) return;

    try {
      setLoading(true);
      
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);

      await axiosInstance.patch(`/users/${currentUser.id}`, {
        cart: updatedCart
      });

      toast.success('Product removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove product from cart');
      setCart(cart);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (!currentUser) return;

    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    try {
      setLoading(true);
      
      const updatedCart = cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);

      await axiosInstance.patch(`/users/${currentUser.id}`, {
        cart: updatedCart
      });

    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
      setCart(cart);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setCart([]);
      
      await axiosInstance.patch(`/users/${currentUser.id}`, {
        cart: []
      });

      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  const getCartItem = (productId) => {
    return cart.find(item => item.id === productId);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // New function: Always increases quantity when clicked
  const handleAddToCart = async (product) => {
    await addToCart(product, 1);
  };

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
    handleAddToCart, // Use this instead of toggle
    refreshCart: () => currentUser && fetchCart(currentUser.id)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};