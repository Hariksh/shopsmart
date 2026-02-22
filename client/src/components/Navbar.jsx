import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Heart, ShoppingCart } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <Link to="/login" className="flex flex-col items-center gap-1 text-gray-600 hover:text-yellow-600 transition-colors">
                            <User className="h-6 w-6" />
                            <span className="text-xs font-medium">Login</span>
                        </Link>
                        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-yellow-600 transition-colors">
                            <Heart className="h-6 w-6" />
                            <span className="text-xs font-medium">Wishlist</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-yellow-600 transition-colors relative">
                            <div className="relative">
                                <ShoppingCart className="h-6 w-6" />
                                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                    2
                                </span>
                            </div>
                            <span className="text-xs font-medium">Cart</span>
                        </button>
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
                        <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600">Login</Link>
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
