import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Armchair, Lamp, Bed, Sofa, ArrowRight, Loader2, PackageX , Check} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

function Furniture() {
    const { addToCart } = useCart();
    const [addedProductId, setAddedProductId] = useState(null);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFurniture = async () => {
            setLoading(true);
            try {
                const [furnitureRes, decoRes, kitchenRes] = await Promise.all([
                    fetch('https://dummyjson.com/products/category/furniture?limit=10'),
                    fetch('https://dummyjson.com/products/category/home-decoration?limit=10'),
                    fetch('https://dummyjson.com/products/category/kitchen-accessories?limit=10')
                ]);

                if (!furnitureRes.ok || !decoRes.ok || !kitchenRes.ok)
                    throw new Error('Network response was not ok');

                const furnitureData = await furnitureRes.json();
                const decoData = await decoRes.json();
                const kitchenData = await kitchenRes.json();

                const combinedProducts = [
                    ...(furnitureData.products || []),
                    ...(decoData.products || []),
                    ...(kitchenData.products || [])
                ].sort(() => Math.random() - 0.5);

                setProducts(combinedProducts);
            } catch (err) {
                console.error('Failed to fetch furniture:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFurniture();
    }, []);

    const features = [
        { icon: Sofa, label: 'Sofas' },
        { icon: Bed, label: 'Bedroom' },
        { icon: Armchair, label: 'Chairs' },
        { icon: Lamp, label: 'Lighting' }
    ];

    return (
        <div className="min-h-screen bg-stone-50">
            <Navbar />
            <div className="relative bg-linear-to-br from-amber-900 via-yellow-900 to-stone-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black opacity-35"></div>
                </div>

                <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/30 border border-amber-400/30 text-amber-200 text-sm font-medium mb-6 backdrop-blur-sm">
                            <Armchair className="h-4 w-4 text-amber-300" />
                            Handcrafted Comfort
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Furnish Your <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-yellow-200">Dream Home</span>
                        </h1>
                        <p className="text-lg text-amber-100 mb-8 max-w-lg">
                            Explore premium furniture crafted for comfort and style. From elegant sofas to modern beds, find pieces that transform any room.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            {features.map((feature, idx) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={idx} className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-pointer transform hover:-translate-y-1">
                                        <Icon className="h-8 w-8 text-amber-300 mb-2" />
                                        <span className="text-sm font-medium">{feature.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center md:justify-end relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/30 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-yellow-600/40 rounded-full blur-3xl"></div>
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Modern Sofa" className="rounded-2xl shadow-2xl transform translate-y-8 object-cover h-64 w-full" />
                            <img src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Wooden Chair" className="rounded-2xl shadow-2xl object-cover h-64 w-full" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Furniture</h2>
                        <p className="text-gray-500">Handpicked pieces to elevate every room</p>
                    </div>
                    <Link to="/products?category=furniture" className="hidden sm:flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition-colors">
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="h-10 w-10 text-amber-600 animate-spin mb-4" />
                        <p className="text-gray-500">Loading exquisite furniture...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl shadow-sm border border-amber-100">
                        <PackageX className="h-16 w-16 text-amber-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No furniture found</h3>
                        <p className="text-gray-500 mb-6">Check back soon for new arrivals!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map(product => {
                            const discountMultiplier = 1 - (product.discountPercentage / 100);
                            const originalPrice = product.price / discountMultiplier;

                            return (
                                <Link
                                    key={product.id}
                                    to={`/products/${product.id}`}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(217,160,60,0.18)] transition-all duration-300 hover:-translate-y-2 border border-amber-50 hover:border-amber-200 flex flex-col"
                                >
                                    <div className="relative pt-[100%] overflow-hidden bg-[#fdfbf7]">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                            style={{ mixBlendMode: 'multiply' }}
                                        />
                                        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
                                            <button
                                                onClick={(e) => { e.preventDefault(); }}
                                                className="p-2.5 bg-white/90 backdrop-blur rounded-full shadow-md text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                                            >
                                                <Heart className="h-5 w-5" />
                                            </button>
                                        </div>
                                        {product.discountPercentage > 0 && (
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-amber-700 border border-amber-200 text-xs font-bold rounded-full shadow-sm">
                                                    Save {Math.round(product.discountPercentage)}%
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col grow">
                                        <div className="text-[10px] text-amber-600 uppercase tracking-widest mb-1.5 font-bold">
                                            {product.brand || product.category}
                                        </div>

                                        <h3 className="font-semibold text-gray-800 text-lg mb-2 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                                            {product.title}
                                        </h3>

                                        <div className="flex items-center gap-1.5 mb-4">
                                            <div className="flex text-amber-400">
                                                <Star className="h-4 w-4 fill-current" />
                                            </div>
                                            <span className="text-sm text-gray-600 font-medium">
                                                {product.rating.toFixed(1)}
                                            </span>
                                            <span className="text-xs text-gray-400 ml-1">
                                                ({product.reviews?.length || Math.floor(Math.random() * 80) + 20} reviews)
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                            <div className="flex flex-col">
                                                <span className="text-xl font-bold text-gray-900">
                                                    ${product.price.toFixed(2)}
                                                </span>
                                                <span className="text-xs text-gray-400 line-through">
                                                    ${originalPrice.toFixed(2)}
                                                </span>
                                            </div>
                                            <button
                                            onClick={(e) => { 
                                                e.preventDefault(); 
                                                const p = typeof product !== 'undefined' ? product : item;
                                                addToCart(p);
                                                setAddedProductId(p._id || p.id);
                                                setTimeout(() => setAddedProductId(null), 2000);
                                            }}
                                            className={`${"flex items-center justify-center p-3 bg-amber-50 rounded-full text-amber-700 hover:bg-amber-600 hover:text-white transition-all group-hover:shadow-md"} ${(addedProductId === (typeof product !== 'undefined' ? (product._id || product.id) : (item._id || item.id))) ? '!bg-green-500 !text-white' : ''}`}
                                        >
                                            {(addedProductId === (typeof product !== 'undefined' ? (product._id || product.id) : (item._id || item.id))) ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                                        </button>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Furniture;
