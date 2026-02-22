import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  ShoppingCart,
  ChevronRight,
  Star,
  Truck,
  ShieldCheck,
  Clock,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';

function Home() {

  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 199.99,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'Accessories'
    },
    {
      id: 3,
      name: 'Ergonomic Office Chair',
      price: 249.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'Furniture'
    },
    {
      id: 4,
      name: 'Designer Sunglasses',
      price: 159.99,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'Fashion'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-yellow-500 text-white text-sm font-bold rounded-full mb-6">
              NEW SEASON ARRIVALS
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Upgrade Your <br />
              <span className="text-yellow-400">Lifestyle</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Discover the latest trends in fashion, electronics, and home decor.
              Premium quality products at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 group">
                Shop Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/products" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg backdrop-blur-sm transition-all border border-white/30">
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $100' },
              { icon: ShieldCheck, title: 'Secure Payment', desc: '100% secure payment' },
              { icon: Clock, title: '24/7 Support', desc: 'Dedicated support' },
              { icon: Star, title: 'Best Quality', desc: 'Premium products' },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <feature.icon className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
          <Link to="/products" className="text-yellow-600 font-semibold hover:text-yellow-700 flex items-center gap-1 group">
            View All
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <Link key={idx} to={`/products?category=${encodeURIComponent(category.name)}`} className="group relative rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow h-64 block">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <span className="text-yellow-400 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Trending Products</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-yellow-600 transition-colors">
                <ChevronRight className="h-5 w-5 rotate-180" />
              </button>
              <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-yellow-600 transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
                    <button className="p-2 bg-white rounded-full shadow-lg text-gray-500 hover:text-red-500 transition-colors">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded">HOT</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs text-gray-500 mb-2">{product.category}</div>
                  <h3 className="font-bold text-gray-800 mb-2 truncate group-hover:text-yellow-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`h-3 w-3 ${s <= Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <button className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-yellow-500 hover:text-white transition-all transform hover:scale-110">
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-yellow-500 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
            <p className="text-white/80 mb-8 text-lg">
              Get the latest updates on new products and upcoming sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-black/10"
              />
              <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-yellow-500 p-1.5 rounded-lg">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">ShopSmart</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Your one-stop destination for premium products. We bring the best of the world to your doorstep.
              </p>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-white transition-all">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-current rounded-sm"></div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-yellow-500 transition-colors">About Us</Link></li>
                <li><Link to="/products" className="hover:text-yellow-500 transition-colors">Products</Link></li>
                <li><Link to="/contact" className="hover:text-yellow-500 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Customer Service</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/faq" className="hover:text-yellow-500 transition-colors">FAQ</Link></li>
                <li><Link to="/shipping" className="hover:text-yellow-500 transition-colors">Shipping Policy</Link></li>
                <li><Link to="/returns" className="hover:text-yellow-500 transition-colors">Returns & Refunds</Link></li>
                <li><Link to="/privacy" className="hover:text-yellow-500 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <div className="mt-1">📍</div>
                  <span>123 Commerce St, Suite 100<br />New York, NY 10001</span>
                </li>
                <li className="flex items-center gap-3">
                  <div>📞</div>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <div>✉️</div>
                  <span>support@shopsmart.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
            <p>&copy; 2026 ShopSmart. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
