import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Shirt, Watch, Scissors, ShoppingBag, ArrowRight, Loader2, PackageX , Check} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

function Fashion() {
    const { addToCart } = useCart();
    const [addedProductId, setAddedProductId] = useState(null);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFashion = async () => {
            setLoading(true);
            try {
                const [womensRes, mensRes] = await Promise.all([
                    fetch('https://dummyjson.com/products/category/womens-dresses?limit=6'),
                    fetch('https://dummyjson.com/products/category/mens-shirts?limit=6')
                ]);

                if (!womensRes.ok || !mensRes.ok) throw new Error('Network response was not ok');
                
                const womensData = await womensRes.json();
                const mensData = await mensRes.json();

                const combinedProducts = [...(womensData.products || []), ...(mensData.products || [])]
                                            .sort(() => Math.random() - 0.5);
                setProducts(combinedProducts);
            } catch (err) {
                console.error('Failed to fetch fashion products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFashion();
    }, []);

    const features = [
        { icon: Shirt, label: 'Clothing' },
        { icon: Watch, label: 'Accessories' },
        { icon: Scissors, label: 'Tailored' },
        { icon: ShoppingBag, label: 'Bags' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="relative bg-linear-to-br from-rose-900 via-fuchsia-900 to-purple-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                </div>
                <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/30 border border-pink-400/30 text-pink-200 text-sm font-medium mb-6 backdrop-blur-sm">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            Trendsetter Collection
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Define Your <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-orange-300">Style</span>
                        </h1>
                        <p className="text-lg text-pink-100 mb-8 max-w-lg">
                            Explore the latest trends in men&apos;s and women&apos;s fashion. Handpicked apparel designed to make you stand out.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            {features.map((feature, idx) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={idx} className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-pointer transform hover:-translate-y-1">
                                        <Icon className="h-8 w-8 text-pink-300 mb-2" />
                                        <span className="text-sm font-medium">{feature.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center md:justify-end relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-purple-500/40 rounded-full blur-3xl"></div>
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Fashion Model" className="rounded-2xl shadow-2xl transform translate-y-8 object-cover h-64 w-full" />
                            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Fashion Clothes" className="rounded-2xl shadow-2xl object-cover h-64 w-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Editor&apos;s Picks</h2>
                        <p className="text-gray-500">Curated fashion to refresh your wardrobe</p>
                    </div>
                    <Link to="/products?category=fashion" className="hidden sm:flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-800 transition-colors">
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="h-10 w-10 text-pink-500 animate-spin mb-4" />
                        <p className="text-gray-500">Curating the finest styles...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl shadow-sm border border-gray-100">
                        <PackageX className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No fashion items found</h3>
                        <p className="text-gray-500 mb-6">Check back soon for new arrivals!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(product => {
                            // Calculate original price based on current price and discount percentage
                            const discountMultiplier = 1 - (product.discountPercentage / 100);
                            const originalPrice = product.price / discountMultiplier;

                            return (
                                <Link
                                    key={product.id}
                                    to={`/products/${product.id}`}
                                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="relative h-64 overflow-hidden bg-gray-50">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
                                            <button
                                                onClick={(e) => { e.preventDefault(); }}
                                                className="p-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg text-gray-500 hover:text-rose-500 transition-colors"
                                            >
                                                <Heart className="h-4 w-4" />
                                            </button>
                                        </div>
                                        {product.discountPercentage > 0 && (
                                            <div className="absolute top-4 left-4">
                                                <span className="px-2.5 py-1 bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm">
                                                    -{Math.round(product.discountPercentage)}%
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 flex flex-col h-40">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-1">
                                                {product.title}
                                            </h3>
                                        </div>
                                        
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-semibold">
                                            {product.brand || product.category}
                                        </div>

                                        <div className="flex items-center gap-1 mb-4">
                                            <div className="flex text-yellow-400">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <Star key={s} className={`h-3 w-3 ${s <= Math.floor(product.rating || 0) ? 'fill-current' : ''}`} />
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium tracking-wide">({product.reviews?.length || Math.floor(Math.random() * 50) + 10})</span>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex flex-col">
                                                <span className="text-lg font-extrabold text-rose-900">
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
                                            className={`${"p-2.5 bg-pink-50 rounded-xl text-pink-600 hover:bg-pink-600 hover:text-white transition-all transform hover:scale-105"} ${(addedProductId === (typeof product !== 'undefined' ? (product._id || product.id) : (item._id || item.id))) ? '!bg-green-500 !text-white' : ''}`}
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

export default Fashion;
