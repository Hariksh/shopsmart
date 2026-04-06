import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Lamp, Coffee, Armchair, Home, Loader2, PackageX, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

function HomeLiving() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [addedProductId, setAddedProductId] = useState(null);

    useEffect(() => {
        const fetchLiving = async () => {
            setLoading(true);
            try {
                const [furnitureRes, decoRes, kitchenRes] = await Promise.all([
                    fetch('https://dummyjson.com/products/category/furniture?limit=4'),
                    fetch('https://dummyjson.com/products/category/home-decoration?limit=4'),
                    fetch('https://dummyjson.com/products/category/kitchen-accessories?limit=4')
                ]);

                if (!furnitureRes.ok || !decoRes.ok || !kitchenRes.ok) throw new Error('Network response was not ok');
                
                const furnitureData = await furnitureRes.json();
                const decoData = await decoRes.json();
                const kitchenResData = await kitchenRes.json();
                
                const combinedProducts = [
                    ...(furnitureData.products || []), 
                    ...(decoData.products || []),
                    ...(kitchenResData.products || [])
                ].sort(() => Math.random() - 0.5);
                setProducts(combinedProducts);
            } catch (err) {
                console.error('Failed to fetch home and living products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLiving();
    }, []);

    const features = [
        { icon: Armchair, label: 'Furniture' },
        { icon: Lamp, label: 'Decor' },
        { icon: Coffee, label: 'Kitchen' },
        { icon: Home, label: 'Living' }
    ];

    return (
        <div className="min-h-screen bg-emerald-50/30">
            <Navbar />
            <div className="relative bg-[#f2fdf7] text-gray-800 overflow-hidden">
                <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-200/50 rounded-full blur-[100px] mix-blend-multiply opacity-70"></div>
                <div className="absolute bottom-0 left-0 w-100 h-100 bg-teal-100/60 rounded-full blur-[100px] mix-blend-multiply opacity-70"></div>
                
                <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col md:flex-row items-center border-b border-emerald-100">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm font-medium mb-6 backdrop-blur-sm shadow-sm">
                            <Home className="h-4 w-4" />
                            Premium Comfort
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
                            Elevate Your <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-400">Living Space</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-lg font-light leading-relaxed">
                            Discover our curated collection of premium furniture, elegant decor, and essential kitchen accessories to make your house a dream home.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            {features.map((feature, idx) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={idx} className="flex flex-col items-center justify-center p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-emerald-100/50 hover:bg-white hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1">
                                        <Icon className="h-8 w-8 text-emerald-500 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center md:justify-end relative">
                        <div className="relative z-10">
                            <img 
                                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                                alt="Living room decor" 
                                className="rounded-[40px] shadow-2xl border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500 w-[90%] md:w-112.5" 
                            />
                            <img 
                                src="https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                                alt="Kitchen accessories" 
                                className="absolute -bottom-8 -left-8 w-40 h-40 object-cover rounded-[30px] border-4 border-white shadow-xl hidden md:block" 
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Curated for Your Home</h2>
                        <p className="text-gray-500">Transform your space with our top picks</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="h-10 w-10 text-emerald-500 animate-spin mb-4" />
                        <p className="text-gray-500">Furnishing your choices...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl shadow-sm border border-emerald-100">
                        <PackageX className="h-16 w-16 text-emerald-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No items found</h3>
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
                                    className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(16,185,129,0.15)] transition-all duration-300 hover:-translate-y-2 border border-emerald-50 hover:border-emerald-100 flex flex-col"
                                >
                                    <div className="relative pt-[100%] overflow-hidden bg-[#fdfbfb]">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                            style={{ mixBlendMode: 'multiply' }}
                                        />
                                        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
                                            <button
                                                onClick={(e) => { e.preventDefault(); }}
                                                className="p-2.5 bg-white/90 backdrop-blur rounded-full shadow-md text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 transition-colors"
                                            >
                                                <Heart className="h-5 w-5" />
                                            </button>
                                        </div>
                                        {product.discountPercentage > 0 && (
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-emerald-600 border border-emerald-100 text-xs font-bold rounded-full shadow-sm">
                                                    Save {Math.round(product.discountPercentage)}%
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col grow">
                                        <div className="text-[10px] text-emerald-500 uppercase tracking-widest mb-1.5 font-bold">
                                            {product.brand || product.category}
                                        </div>
                                        
                                        <h3 className="font-semibold text-gray-800 text-lg mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
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
                                                    addToCart(product);
                                                    setAddedProductId(product.id);
                                                    setTimeout(() => setAddedProductId(null), 2000);
                                                }}
                                                className={`flex items-center justify-center p-3 rounded-full transition-all group-hover:shadow-md ${addedProductId === product.id ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white'}`}
                                            >
                                                {addedProductId === product.id ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
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
export default HomeLiving;