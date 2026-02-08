import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LogIn, UserPlus, ArrowRight } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-yellow-500 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">ShopSmart</h1>
          </div>
          <nav className="flex gap-3">
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2 bg-white text-yellow-600 font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 px-5 py-2 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to ShopSmart
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your one-stop shop for all your needs. Quality products at affordable prices.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/signup"
              className="flex items-center gap-2 px-8 py-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors shadow-lg"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Wide Selection</h3>
            <p className="text-gray-600">Browse thousands of products across multiple categories</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Best Prices</h3>
            <p className="text-gray-600">Competitive pricing with regular discounts and offers</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">ShopSmart</h4>
              <p className="text-gray-400">Your one-stop shop for all your needs. Quality products at affordable prices.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-yellow-500">About Us</a></li>
                <li><a href="#" className="hover:text-yellow-500">Contact</a></li>
                <li><a href="#" className="hover:text-yellow-500">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-yellow-500">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-yellow-500">Shipping Information</a></li>
                <li><a href="#" className="hover:text-yellow-500">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-yellow-500">Payment Methods</a></li>
                <li><a href="#" className="hover:text-yellow-500">Help Center</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2026 ShopSmart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
