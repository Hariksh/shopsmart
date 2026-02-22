import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
    Search, ChevronDown, Star, Heart, ShoppingCart,
    ChevronLeft, ChevronRight, Loader2, PackageX, X, SlidersHorizontal
} from 'lucide-react';
import Navbar from '../components/Navbar';

const API_BASE = import.meta.env.VITE_API_URL || '';

const CATEGORIES = ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Accessories', 'Furniture'];

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
];

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');

    const updateParams = (updates) => {
        const params = new URLSearchParams(searchParams);
        Object.entries(updates).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });
        if (updates.category !== undefined || updates.search !== undefined || updates.sort !== undefined) {
            params.set('page', '1');
        }
        setSearchParams(params);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (category) params.set('category', category);
                if (search) params.set('search', search);
                if (sort) params.set('sort', sort);
                params.set('page', page.toString());
                params.set('limit', '12');

                const res = await fetch(`${API_BASE}/api/products?${params}`);
                const data = await res.json();
                setProducts(data.products);
                setTotalPages(data.totalPages);
                setTotalProducts(data.totalProducts);
            } catch (err) {
                console.error('Failed to fetch products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, search, sort, page]);

    const [searchInput, setSearchInput] = useState(search);
    const handleSearch = (e) => {
        e.preventDefault();
        updateParams({ search: searchInput });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Page Header */}
            <div className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Our Products</h1>
                    <p className="text-gray-400">
                        {totalProducts > 0 ? `Showing ${totalProducts} product${totalProducts !== 1 ? 's' : ''}` : 'Browse our collection'}
                        {category && <span className="text-yellow-400"> in {category}</span>}
                        {search && <span className="text-yellow-400"> matching &quot;{search}&quot;</span>}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <form onSubmit={handleSearch} className="flex-1 relative">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        {search && (
                            <button
                                type="button"
                                onClick={() => { setSearchInput(''); updateParams({ search: '' }); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </form>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                            className="md:hidden flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            Filters
                        </button>

                        <div className="relative">
                            <select
                                value={sort}
                                onChange={(e) => updateParams({ sort: e.target.value })}
                                className="appearance-none pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none cursor-pointer"
                            >
                                {SORT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Category Sidebar — desktop */}
                    <aside className={`
                        ${mobileFiltersOpen ? 'block fixed inset-0 z-50 bg-black/50' : 'hidden'}
                        md:block md:static md:bg-transparent md:z-auto
                    `}>
                        <div className={`
                            ${mobileFiltersOpen ? 'absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-6' : ''}
                            md:w-56 md:flex-shrink-0
                        `}>
                            {mobileFiltersOpen && (
                                <div className="flex items-center justify-between mb-6 md:hidden">
                                    <h3 className="font-bold text-lg">Filters</h3>
                                    <button onClick={() => setMobileFiltersOpen(false)}>
                                        <X className="h-5 w-5 text-gray-500" />
                                    </button>
                                </div>
                            )}

                            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Categories</h3>
                            <ul className="space-y-1">
                                <li>
                                    <button
                                        onClick={() => { updateParams({ category: '' }); setMobileFiltersOpen(false); }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!category ? 'bg-yellow-500 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        All Products
                                    </button>
                                </li>
                                {CATEGORIES.map(cat => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => { updateParams({ category: cat }); setMobileFiltersOpen(false); }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === cat ? 'bg-yellow-500 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {/* Active Filters */}
                        {(category || search) && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {category && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
                                        {category}
                                        <button onClick={() => updateParams({ category: '' })} className="hover:text-yellow-900">
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    </span>
                                )}
                                {search && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                        &quot;{search}&quot;
                                        <button onClick={() => { setSearchInput(''); updateParams({ search: '' }); }} className="hover:text-blue-900">
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    </span>
                                )}
                                <button
                                    onClick={() => { setSearchInput(''); updateParams({ category: '', search: '' }); }}
                                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24">
                                <Loader2 className="h-10 w-10 text-yellow-500 animate-spin mb-4" />
                                <p className="text-gray-500">Loading products...</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <PackageX className="h-16 w-16 text-gray-300 mb-4" />
                                <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you&apos;re looking for.</p>
                                <button
                                    onClick={() => { setSearchInput(''); setSearchParams({}); }}
                                    className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                                >
                                    View All Products
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map(product => (
                                        <Link
                                            key={product._id}
                                            to={`/products/${product._id}`}
                                            className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                                        >
                                            <div className="relative h-64 overflow-hidden bg-gray-100">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
                                                    <button
                                                        onClick={(e) => e.preventDefault()}
                                                        className="p-2 bg-white rounded-full shadow-lg text-gray-500 hover:text-red-500 transition-colors"
                                                    >
                                                        <Heart className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                {product.originalPrice && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                                                            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                                        </span>
                                                    </div>
                                                )}
                                                {product.stock <= 5 && product.stock > 0 && (
                                                    <div className="absolute bottom-4 left-4">
                                                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                                                            Only {product.stock} left
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-5">
                                                <div className="text-xs text-gray-500 mb-2">{product.category}</div>
                                                <h3 className="font-bold text-gray-800 mb-2 truncate group-hover:text-yellow-600 transition-colors">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center gap-1 mb-3">
                                                    <div className="flex text-yellow-400">
                                                        {[1, 2, 3, 4, 5].map(s => (
                                                            <Star key={s} className={`h-3 w-3 ${s <= Math.floor(product.rating) ? 'fill-current' : ''}`} />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-gray-400">({product.reviewCount})</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl font-bold text-gray-900">
                                                            ${product.price.toFixed(2)}
                                                        </span>
                                                        {product.originalPrice && (
                                                            <span className="text-sm text-gray-400 line-through">
                                                                ${product.originalPrice.toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={(e) => e.preventDefault()}
                                                        className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-yellow-500 hover:text-white transition-all transform hover:scale-110"
                                                    >
                                                        <ShoppingCart className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-10">
                                        <button
                                            onClick={() => updateParams({ page: (page - 1).toString() })}
                                            disabled={page <= 1}
                                            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                            <button
                                                key={p}
                                                onClick={() => updateParams({ page: p.toString() })}
                                                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${p === page
                                                    ? 'bg-yellow-500 text-white'
                                                    : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => updateParams({ page: (page + 1).toString() })}
                                            disabled={page >= totalPages}
                                            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
