import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

export default function Navbar() {
  const{getCartCount}=useCart()
  const{wishlistCount}=useWishlist()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate(); // ✅ correct hook for navigation

  const activeClass = "text-purple-600 font-medium";
  const inactiveClass = "text-gray-700 font-medium";

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left Side - Logo */}
          <div className="flex-shrink-0">
            <div className="flex flex-col items-start">
              <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight cursor-pointer">
                GYM SHARK
              </Link>           
            </div>
          </div>

          {/* Center - Categories */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl">
            <div className="flex items-center space-x-8">
              <NavLink to="/men" className={({ isActive }) => `group flex items-center space-x-1 px-3 py-2 text-sm transition-colors duration-300 ${isActive ? activeClass : inactiveClass}`}>
                Men
              </NavLink>
              <NavLink to="/women" className={({ isActive }) => `group flex items-center space-x-1 px-3 py-2 text-sm transition-colors duration-300 ${isActive ? activeClass : inactiveClass}`}>
                Women
              </NavLink>
              <NavLink to="/accessories" className={({ isActive }) => `group flex items-center space-x-1 px-3 py-2 text-sm transition-colors duration-300 ${isActive ? activeClass : inactiveClass}`}>
                Accessories
              </NavLink>
            </div>
          </div>

          {/* Right Side - Search & Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Search - Desktop */}
            <div className="hidden lg:block relative">
              <div
                className={`flex items-center bg-gray-50 border border-gray-200 rounded-xl pl-3 pr-2 py-2 overflow-hidden transition-all duration-300 ease-in-out ${
                  isSearchOpen ? 'w-64 shadow-md' : 'w-10 hover:bg-gray-100'
                }`}
              >
                <Search
                  className="text-gray-500 flex-shrink-0 cursor-pointer transition-transform duration-300"
                  size={15}
                  onClick={() => setIsSearchOpen(true)}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  className={`bg-transparent text-sm text-gray-700 placeholder-gray-500 focus:outline-none ml-2 transition-all duration-300 ${
                    isSearchOpen ? 'opacity-100 w-full' : 'opacity-0 w-0'
                  }`}
                  autoFocus={isSearchOpen}
                />
                {isSearchOpen && (
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className=" ml-2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200 flex-shrink-0"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center space-x-2">
              {/* ✅ Navigate to wishlist */}
              <button  
                onClick={() => navigate('/wishlist')} 
                className="cursor-pointer text-gray-600 hover:text-purple-600 transition-all duration-300 p-2 hover:bg-purple-50 rounded-lg relative group" 
                aria-label="Wishlist"
              >
                <Heart size={22} className="group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-pink-500 to-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg shadow-pink-500/40 ring-2 ring-white">
                  {wishlistCount}
                </span>
              </button>

              {/* ✅ Navigate to cart */}
              <button 
                onClick={() => navigate('/cart')}
                className="cursor-pointer text-gray-600 hover:text-purple-600 transition-all duration-300 p-2 hover:bg-purple-50 rounded-lg relative group" 
                aria-label="Cart"
              >
                <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg shadow-purple-500/40 ring-2 ring-white">
                 {getCartCount()}
                </span>
              </button>

              {/* Profile */}
              <button 
                onClick={() => navigate('/account')}
                className="cursor-pointer flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-all duration-300 px-3 py-2 hover:bg-purple-50 rounded-lg group" 
                aria-label="Profile"
              >
                <User size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium hidden xl:block">Account</span>
              </button>
            </div>

            {/* Mobile Icons */}
            <div className="flex lg:hidden items-center space-x-2">
              <button className="cursor-pointer text-gray-600 hover:text-purple-600 transition-all duration-300 p-2 hover:bg-purple-50 rounded-lg relative group" aria-label="Wishlist">
                <Heart size={22} className="group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-pink-500 to-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg shadow-pink-500/40 ring-2 ring-white">
                  {wishlistCount}
                </span>
              </button>
              <button className="cursor-pointer text-gray-600 hover:text-purple-600 transition-all duration-300 p-2 hover:bg-purple-50 rounded-lg relative group" aria-label="Cart">
                <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg shadow-purple-500/40 ring-2 ring-white">
                  {getCartCount()}                
                </span>
              </button>
              <button className="cursor-pointer flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-all duration-300 px-3 py-2 hover:bg-purple-50 rounded-lg group" aria-label="Profile">
                <User size={22} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer lg:hidden text-gray-600 hover:text-purple-600 transition-all duration-300 p-2 hover:bg-purple-50 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 animate-in slide-in-from-right duration-300">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight cursor-pointer">
              GYM SHARK
            </Link>               
            <button
              onClick={() => setIsMenuOpen(false)}
              className="cursor-pointer text-gray-600 hover:text-gray-800 transition-colors p-2"
            >
              <X size={28} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto h-full pb-32">
            {/* Search in Mobile */}
            <div className="mb-8">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-4">
                <Search className="text-gray-500 flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent text-sm text-gray-700 placeholder-gray-500 focus:outline-none ml-3 w-full"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2 mb-8">
              <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Categories
              </h3>
              <NavLink to="/men" className={({ isActive }) => `block px-5 py-4 rounded-2xl text-base font-medium transition-all duration-300 shadow-sm border border-gray-100 ${isActive ? activeClass : inactiveClass}`}>
                Men
              </NavLink>
              <NavLink to="/women" className={({ isActive }) => `block px-5 py-4 rounded-2xl text-base font-medium transition-all duration-300 shadow-sm border border-gray-100 ${isActive ? activeClass : inactiveClass}`}>
                Women
              </NavLink>
              <NavLink to="/accessories" className={({ isActive }) => `block px-5 py-4 rounded-2xl text-base font-medium transition-all duration-300 shadow-sm border border-gray-100 ${isActive ? activeClass : inactiveClass}`}>
                Accessories
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
