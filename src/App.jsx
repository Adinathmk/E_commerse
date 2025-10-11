import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MenProducts from './pages/Categories/MenProducts';
import WomenProducts from './pages/categories/WomenProducts';
import AccessoriesProducts from './pages/Categories/AccessoriesProducts';
import { ProductProvider } from './contexts/ProductContext';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <ProductProvider>
      <AuthProvider>
        <Routes>
                {/* Routes without Navbar */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                {/* Routes with Navbar */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={''} />
                  <Route path="/men" element={<MenProducts />} />
                  <Route path="/women" element={<WomenProducts />} />
                  <Route path="/accessories" element={<AccessoriesProducts />} />
                </Route>
        </Routes>
      </AuthProvider>      
    </ProductProvider>
    
  );
}

export default App;
