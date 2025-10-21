import { Routes, Route, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { ProductProvider } from './contexts/ProductContext';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import { WishlistProvider } from './contexts/WishlistContext'; 
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './contexts/CartContext';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import Products from './pages/Products';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import UserProfile from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';
import ProtectLogin from './layouts/ProtectLogin';

function App() {
  return (
    <ProductProvider>
      <AuthProvider>
        <CartProvider>
         <WishlistProvider>        
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <ScrollToTop/>
            <Routes>
                <Route element={<ProtectLogin/>}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />                  
                </Route>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home/>} />
                  <Route path="/products/:category" element={<Products/>}/>
                  <Route path="/product/:id" element={<ProductDetails/>}/>
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/profile" element={<UserProfile/>} />
                  <Route path="/profile" element={<UserProfile/>} />
                </Route>
            </Routes>
          </WishlistProvider>
          </CartProvider>
      </AuthProvider>      
    </ProductProvider>
    
  );
}

export default App;
