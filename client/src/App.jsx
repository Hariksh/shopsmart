import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />

                    {/* Protected User Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    {/* Protected Admin Routes */}
                    <Route element={<AdminRoute />}>
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

