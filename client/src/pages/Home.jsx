import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function Home() {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold mb-8 text-text-main">ShopSmart</h1>

        <div className="flex gap-4 justify-center">
          <Link to="/login"
            className="px-6 py-3 bg-white text-primary border-2 border-primary font-bold rounded-lg hover:bg-green-50 transition-colors shadow-lg">
            Login
          </Link>
          <Link to="/signup"
            className="px-6 py-3 bg-white text-primary border-2 border-primary font-bold rounded-lg hover:bg-green-50 transition-colors shadow-lg">
            Signup
          </Link>
        </div>
      </div>
    );
}

export default Home
