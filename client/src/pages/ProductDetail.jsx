import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, Star, ShoppingCart, Heart, Truck, ShieldCheck,
    RotateCcw, Loader2, PackageX, Minus, Plus, Check
} from 'lucide-react';
import Navbar from '../components/Navbar';

const API_BASE = import.meta.env.VITE_API_URL || '';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(false);
            try {
                const res = await fetch(`${API_BASE}/api/products/${id}`);
                if (!res.ok) throw new Error('Not found');
                const data = await res.json();
                setProduct(data);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-32">
                    <Loader2 className="h-10 w-10 text-yellow-500 animate-spin mb-4" />
                    <p className="text-gray-500">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-32 text-center px-4">
                    <PackageX className="h-16 w-16 text-gray-300 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Product Not Found</h2>
                    <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
                    <Link
                        to="/products"
                        className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    const discountPercent = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    const inStock = product.stock > 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link to="/" className="hover:text-yellow-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/products" className="hover:text-yellow-600 transition-colors">Products</Link>
                        <span>/</span>
                        <Link
                            to={`/products?category=${encodeURIComponent(product.category)}`}
                            className="hover:text-yellow-600 transition-colors"
                        >
                            {product.category}
                        </Link>
                        <span>/</span>
                        <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors mb-8 group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                        {discountPercent > 0 && (
                            <div className="absolute top-6 left-6">
                                <span className="px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-lg shadow-lg">
                                    -{discountPercent}% OFF
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-2">
                            <Link
                                to={`/products?category=${encodeURIComponent(product.category)}`}
                                className="text-sm text-yellow-600 font-medium hover:text-yellow-700 transition-colors"
                            >
                                {product.category}
                            </Link>
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <Star
                                        key={s}
                                        className={`h-5 w-5 ${s <= Math.floor(product.rating) ? 'fill-current' : ''}`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 font-medium">{product.rating}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">{product.reviewCount} reviews</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-end gap-3 mb-6">
                            <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-xl text-gray-400 line-through mb-1">
                                        ${product.originalPrice.toFixed(2)}
                                    </span>
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-sm font-semibold rounded mb-1">
                                        Save ${(product.originalPrice - product.price).toFixed(2)}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">{product.description}</p>

                        {/* Stock Status */}
                        <div className="mb-6">
                            {inStock ? (
                                <div className="flex items-center gap-2 text-green-600">
                                    <Check className="h-5 w-5" />
                                    <span className="font-medium">
                                        In Stock
                                        {product.stock <= 10 && (
                                            <span className="text-orange-500 ml-1">— Only {product.stock} left!</span>
                                        )}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-red-500 font-medium">Out of Stock</span>
                            )}
                        </div>

                        {/* Quantity & Add to Cart */}
                        {inStock && (
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 text-gray-600 hover:bg-gray-100 transition-colors"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="px-6 py-3 font-semibold text-gray-800 min-w-[60px] text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="p-3 text-gray-600 hover:bg-gray-100 transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>

                                <button className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 transition-all transform hover:scale-[1.02] shadow-lg shadow-yellow-500/25">
                                    <ShoppingCart className="h-5 w-5" />
                                    Add to Cart
                                </button>

                                <button className="p-4 border border-gray-200 rounded-xl text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors">
                                    <Heart className="h-5 w-5" />
                                </button>
                            </div>
                        )}

                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {product.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Guarantees */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-3 p-3">
                                <div className="p-2 bg-yellow-100 rounded-full">
                                    <Truck className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">Free Shipping</p>
                                    <p className="text-xs text-gray-500">Orders over $100</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3">
                                <div className="p-2 bg-yellow-100 rounded-full">
                                    <ShieldCheck className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">2 Year Warranty</p>
                                    <p className="text-xs text-gray-500">Full coverage</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3">
                                <div className="p-2 bg-yellow-100 rounded-full">
                                    <RotateCcw className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">Easy Returns</p>
                                    <p className="text-xs text-gray-500">30-day policy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
