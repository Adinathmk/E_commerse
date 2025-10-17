import { Search, Heart, ShoppingCart, User, Menu, X, LogOut, Package, User as UserIcon, LogIn } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext'; // Import the auth context
import { toast } from 'react-toastify';

export default function Navbar() {
  const { getCartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser, logoutUser } = useAuth(); // Use auth context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  const profileModalRef = useRef(null);
  const activeClass = "text-purple-600 font-medium";
  const inactiveClass = "text-gray-700 font-medium";
  const [searchValue,setSearchValue]=useState('')

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileModalRef.current && !profileModalRef.current.contains(event.target)) {
        setIsProfileModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    logoutUser(); // Use the logout function from auth context
    setIsProfileModalOpen(false);
    toast.success('Signed out successfully!');
  };

  const handleProfileClick = () => {
    if (!currentUser) {
      // If not logged in, navigate to login page
      navigate('/login');
    } else {
      // If logged in, toggle profile modal
      setIsProfileModalOpen(!isProfileModalOpen);
    }
  };

  const handleMyOrders = () => {
    setIsProfileModalOpen(false);
    navigate('/orders');
  };

  const handleProfile = () => {
    setIsProfileModalOpen(false);
    navigate('/profile');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Format user name for display
  const getUserDisplayName = () => {
    if (!currentUser) return 'User';
    
    if (currentUser.name) {
      return currentUser.name;
    } else if (currentUser.firstName && currentUser.lastName) {
      return `${currentUser.firstName} ${currentUser.lastName}`;
    } else if (currentUser.email) {
      return currentUser.email.split('@')[0];
    }
    
    return 'User';
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!currentUser) return 'U';
    
    const name = getUserDisplayName();
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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
              <NavLink to="/products/men" className={({ isActive }) => `group flex items-center space-x-1 px-3 py-2 text-sm transition-colors duration-300 ${isActive ? activeClass : inactiveClass}`}>
                Men
              </NavLink>
              <NavLink to="/products/women" className={({ isActive }) => `group flex items-center space-x-1 px-3 py-2 text-sm transition-colors duration-300 ${isActive ? activeClass : inactiveClass}`}>
                Women
              </NavLink>
              <NavLink to="/products/accessories" className={({ isActive }) => `group flex items-center space-x-1 px-3 py-2 text-sm transition-colors duration-300 ${isActive ? activeClass : inactiveClass}`}>
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
                  value={searchValue}
                  onChange={(e)=>setSearchValue(e.target.value)}
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
               <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[500px] bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
                  <p className="text-gray-600 text-sm">Recent searches or results...</p>
              </div>


              </div>
            </div>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center space-x-2">
              {/* Wishlist */}
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

              {/* Cart */}
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

              {/* Profile/Login with Modal */}
              <div className="relative" ref={profileModalRef}>
                {currentUser ? (
                  // Logged In State - Show Account with Dropdown
                  <>
                    <button 
                      onClick={handleProfileClick}
                      className="cursor-pointer flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-all duration-300 px-3 py-2 hover:bg-purple-50 rounded-lg group" 
                      aria-label="Account"
                    >
                      <User size={20} className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium hidden xl:block">Account</span>
                    </button>

                    {/* Profile Modal */}
                    {isProfileModalOpen && (
                      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-3 z-50 animate-in slide-in-from-top-2 duration-200">
                        {/* User Welcome Section */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {getUserInitials()}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                Hello, {getUserDisplayName()}!
                              </p>
                              <p className="text-xs text-gray-500 truncate mt-1">
                                Welcome to GYM SHARK
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Options */}
                        <div className="py-2">
                          <button
                            onClick={handleProfile}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                          >
                            <UserIcon size={18} className="text-gray-500" />
                            <span className="font-medium">Profile</span>
                          </button>
                          
                          <button
                            onClick={handleMyOrders}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                          >
                            <Package size={18} className="text-gray-500" />
                            <span className="font-medium">My Orders</span>
                          </button>
                          
                          <div className="border-t border-gray-100 my-1"></div>
                          
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                          >
                            <LogOut size={18} />
                            <span className="font-medium">Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  // Not Logged In State - Show Login Button
                  <button 
                    onClick={handleLogin}
                    className="cursor-pointer flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-all duration-300 px-3 py-2 hover:bg-purple-50 rounded-lg group" 
                    aria-label="Login"
                  >
                    <LogIn size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium hidden xl:block">Login</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Icons */}
            <div className="flex lg:hidden items-center space-x-2">
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
              <NavLink 
                to="/men" 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `block px-5 py-4 rounded-2xl text-base font-medium transition-all duration-300 shadow-sm border border-gray-100 ${isActive ? activeClass : inactiveClass}`}
              >
                Men
              </NavLink>
              <NavLink 
                to="/women" 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `block px-5 py-4 rounded-2xl text-base font-medium transition-all duration-300 shadow-sm border border-gray-100 ${isActive ? activeClass : inactiveClass}`}
              >
                Women
              </NavLink>
              <NavLink 
                to="/accessories" 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `block px-5 py-4 rounded-2xl text-base font-medium transition-all duration-300 shadow-sm border border-gray-100 ${isActive ? activeClass : inactiveClass}`}
              >
                Accessories
              </NavLink>
            </div>

            {/* Profile Options in Mobile Menu */}
            <div className="space-y-2">
              <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Account
              </h3>
              {currentUser ? (
                // Logged In - Show Profile Options with User Info
                <>
                  {/* User Info in Mobile Menu */}
                  <div className="px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {getUserInitials()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Hello, {getUserDisplayName()}!
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Welcome to GYM SHARK
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/profile');
                    }}
                    className="w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-base font-medium text-gray-700 transition-all duration-300 shadow-sm border border-gray-100 hover:text-purple-600 hover:border-purple-200"
                  >
                    <UserIcon size={20} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/orders');
                    }}
                    className="w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-base font-medium text-gray-700 transition-all duration-300 shadow-sm border border-gray-100 hover:text-purple-600 hover:border-purple-200"
                  >
                    <Package size={20} />
                    <span>My Orders</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-base font-medium text-red-600 transition-all duration-300 shadow-sm border border-gray-100 hover:bg-red-50 hover:border-red-200"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                // Not Logged In - Show Login Option
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-base font-medium text-gray-700 transition-all duration-300 shadow-sm border border-gray-100 hover:text-purple-600 hover:border-purple-200"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}