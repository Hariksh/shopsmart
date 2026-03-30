import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Cpu, Smartphone, Monitor, Headphones, Zap, ArrowRight, Loader2, PackageX } from 'lucide-react';
import Navbar from '../components/Navbar';

const API_BASE = import.meta.env.VITE_API_URL || '';

function Electronics() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchElectronics = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE}/api/products?category=Electronics&limit=12&sort=newest`);
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                setProducts(data.products || []);
            } catch (err) {
                console.error('Failed to fetch electronics:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchElectronics();
    }, []);

    const features = [
        { icon: Smartphone, label: 'Phones' },
        { icon: Monitor, label: 'Laptops' },
        { icon: Headphones, label: 'Audio' },
        { icon: Cpu, label: 'Components' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Premium Hero Section */}
            <div className="relative bg-linear-to-br from-indigo-900 via-blue-900 to-indigo-800 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                </div>
                <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-200 text-sm font-medium mb-6 backdrop-blur-sm">
                            <Zap className="h-4 w-4 text-yellow-400" />
                            Next-Gen Tech
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Elevate Your <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">Digital Life</span>
                        </h1>
                        <p className="text-lg text-blue-100 mb-8 max-w-lg">
                            Discover the latest in electronics, from high-performance laptops to cutting-edge audio gear. Experience innovation at its finest.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            {features.map((feature, idx) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={idx} className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-pointer transform hover:-translate-y-1">
                                        <Icon className="h-8 w-8 text-cyan-300 mb-2" />
                                        <span className="text-sm font-medium">{feature.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center md:justify-end relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-indigo-500/40 rounded-full blur-3xl"></div>
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Laptop" className="rounded-2xl shadow-2xl transform translate-y-8" />
                            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Headphones" className="rounded-2xl shadow-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Electronics</h2>
                        <p className="text-gray-500">Upgrade your setup with our top picks</p>
                    </div>
                    <Link to="/products?category=Electronics" className="hidden sm:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
                        <p className="text-gray-500">Loading latest gadgets...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl shadow-sm border border-gray-100">
                        <PackageX className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No electronics found</h3>
                        <p className="text-gray-500 mb-6">Check back soon for new arrivals!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <Link
                                key={product._id}
                                to={`/products/${product._id}`}
                                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="relative h-56 overflow-hidden bg-gray-50">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
                                        <button
                                            onClick={(e) => { e.preventDefault(); }}
                                            className="p-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg text-gray-500 hover:text-red-500 transition-colors"
                                        >
                                            <Heart className="h-4 w-4" />
                                        </button>
                                    </div>
                                    {product.originalPrice && (
                                        <div className="absolute top-4 left-4">
                                            <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-sm">
                                                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-1 mb-4">
                                        <div className="flex text-yellow-400">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} className={`h-3 w-3 ${s <= Math.floor(product.rating || 0) ? 'fill-current' : ''}`} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium tracking-wide">({product.reviewCount || 0})</span>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-extrabold text-blue-900">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            {product.originalPrice && (
                                                <span className="text-xs text-gray-400 line-through">
                                                    ${product.originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={(e) => { e.preventDefault(); }}
                                            className="p-2.5 bg-blue-50 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105"
                                        >
                                            <ShoppingCart className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Electronics;
