import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Heart, LogOut, LayoutDashboard } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import CartButton from './CartButton';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-yellow-500 p-2 rounded-lg">
                            <ShoppingBag className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">ShopSmart</span>
                    </Link>

                    <div className="hidden md:flex items-center ml-8 gap-6">
                        <Link to="/electronics" className="text-gray-600 font-medium hover:text-yellow-500 transition-colors">
                            Electronics
                        </Link>
                        <Link to="/fashion" className="text-gray-600 font-medium hover:text-pink-600 transition-colors">
                            Fashion
                        </Link>
                        <Link to="/home-living" className="text-gray-600 font-medium hover:text-emerald-600 transition-colors">
                            Home & Living Items
                        </Link>
                        <Link to="/accessories" className="text-gray-600 font-medium hover:text-purple-600 transition-colors">
                            Accessories
                        </Link>
                        <Link to="/furniture" className="text-gray-600 font-medium hover:text-amber-600 transition-colors">
                            Furniture
                        </Link>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-2xl mx-12">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search for products, brands and more..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="flex flex-col items-center gap-1 text-yellow-600 hover:text-yellow-700 transition-colors">
                                <LayoutDashboard className="h-6 w-6" />
                                <span className="text-xs font-medium">Admin</span>
                            </Link>
                        )}
                        {user ? (
                            <>
                                <Link to="/profile" className="flex flex-col items-center gap-1 text-gray-600 hover:text-yellow-600 transition-colors">
                                    <User className="h-6 w-6" />
                                    <span className="text-xs font-medium">Profile</span>
                                </Link>
                                <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
                                    <LogOut className="h-6 w-6" />
                                    <span className="text-xs font-medium">Logout</span>
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="flex flex-col items-center gap-1 text-gray-600 hover:text-yellow-600 transition-colors">
                                <User className="h-6 w-6" />
                                <span className="text-xs font-medium">Login</span>
                            </Link>
                        )}
                        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-yellow-600 transition-colors">
                            <Heart className="h-6 w-6" />
                            <span className="text-xs font-medium">Wishlist</span>
                        </button>
                        <div className="flex flex-col items-center gap-1 text-gray-600 hover:text-yellow-600 transition-colors">
                            <CartButton />
                            <span className="text-xs font-medium">Cart</span>
                        </div>
                    </div>

                    <button
                        className="md:hidden p-2 text-gray-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                <div className="md:hidden pb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="px-4 py-2 space-y-1">
                        {user ? (
                            <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
                        ) : (
                            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600">Login</Link>
                        )}
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-bold text-yellow-600 hover:bg-yellow-50">Admin Dashboard</Link>
                        )}
                        <Link to="/electronics" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600">Electronics</Link>
                        <Link to="/fashion" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600">Fashion</Link>
                        <Link to="/home-living" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">Home & Living Items</Link>
                        <Link to="/accessories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600">Accessories</Link>
                        <Link to="/furniture" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600">Furniture</Link>
                        <Link to="/orders" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600">Orders</Link>
                        <Link to="/wishlist" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600">Wishlist</Link>
                        <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600">Cart</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
