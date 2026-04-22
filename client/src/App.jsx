import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Electronics from './pages/Electronics';
import Fashion from './pages/Fashion';
import HomeLiving from './pages/HomeLiving';
import Accessories from './pages/Accessories';
import Furniture from './pages/Furniture';
import OrderSuccess from './pages/OrderSuccess';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/electronics" element={<Electronics />} />
                        <Route path="/fashion" element={<Fashion />} />
                        <Route path="/home-living" element={<HomeLiving />} />
                        <Route path="/accessories" element={<Accessories />} />
                        <Route path="/furniture" element={<Furniture />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                        </Route>

                        <Route element={<AdminRoute />}>
                            <Route path="/admin" element={<AdminDashboard />} />
                        </Route>
                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;

