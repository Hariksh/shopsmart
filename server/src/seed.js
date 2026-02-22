require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: 'Premium Wireless Headphones',
        description: 'Experience crystal-clear sound with active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions. Perfect for music lovers and professionals.',
        price: 299.99,
        originalPrice: 399.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.8,
        reviewCount: 342,
        stock: 45,
        tags: ['headphones', 'wireless', 'noise-cancelling', 'bluetooth']
    },
    {
        name: 'Smart Fitness Watch',
        description: 'Track your health and fitness goals with heart rate monitoring, GPS tracking, sleep analysis, and 7-day battery life. Water-resistant up to 50m.',
        price: 199.99,
        originalPrice: 249.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.6,
        reviewCount: 218,
        stock: 72,
        tags: ['smartwatch', 'fitness', 'health', 'wearable']
    },
    {
        name: 'Portable Bluetooth Speaker',
        description: 'Powerful 360-degree sound in a compact, waterproof design. Perfect for outdoor adventures with 12-hour playback and built-in microphone.',
        price: 79.99,
        originalPrice: 99.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.4,
        reviewCount: 156,
        stock: 120,
        tags: ['speaker', 'bluetooth', 'portable', 'waterproof']
    },
    {
        name: '4K Ultra HD Webcam',
        description: 'Professional-grade webcam with 4K resolution, auto-focus, low-light correction, and dual noise-cancelling microphones for crystal-clear video calls.',
        price: 149.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.5,
        reviewCount: 89,
        stock: 35,
        tags: ['webcam', '4k', 'streaming', 'video-conference']
    },
    {
        name: 'Designer Sunglasses',
        description: 'Premium UV400 polarized sunglasses with lightweight titanium frame and anti-scratch coating. A timeless design that suits every face shape.',
        price: 159.99,
        originalPrice: 219.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.5,
        reviewCount: 203,
        stock: 88,
        tags: ['sunglasses', 'polarized', 'designer', 'uv-protection']
    },
    {
        name: 'Classic Leather Backpack',
        description: 'Handcrafted genuine leather backpack with padded laptop compartment, multiple pockets, and adjustable straps. Built to last a lifetime.',
        price: 189.99,
        originalPrice: 249.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.7,
        reviewCount: 167,
        stock: 30,
        tags: ['backpack', 'leather', 'laptop-bag', 'travel']
    },
    {
        name: 'Minimalist Analog Watch',
        description: 'Elegant stainless steel watch with sapphire crystal glass, Japanese quartz movement, and genuine leather strap. Water-resistant to 30m.',
        price: 129.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.3,
        reviewCount: 94,
        stock: 55,
        tags: ['watch', 'analog', 'minimalist', 'stainless-steel']
    },
    {
        name: 'Premium Running Shoes',
        description: 'Lightweight performance running shoes with responsive cushioning, breathable mesh upper, and superior traction outsole for all terrains.',
        price: 139.99,
        originalPrice: 179.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.6,
        reviewCount: 412,
        stock: 150,
        tags: ['shoes', 'running', 'sneakers', 'athletic']
    },
    {
        name: 'Ergonomic Office Chair',
        description: 'Premium mesh office chair with adjustable lumbar support, headrest, 4D armrests, and tilt mechanism. Designed for 8+ hours of comfortable seating.',
        price: 249.99,
        originalPrice: 349.99,
        category: 'Furniture',
        image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.9,
        reviewCount: 521,
        stock: 22,
        tags: ['chair', 'ergonomic', 'office', 'mesh']
    },
    {
        name: 'Standing Desk Converter',
        description: 'Transform any desk into a sit-stand workstation. Smooth gas spring lift, spacious work surface, and built-in cable management.',
        price: 199.99,
        category: 'Furniture',
        image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.4,
        reviewCount: 78,
        stock: 18,
        tags: ['desk', 'standing', 'converter', 'ergonomic']
    },
    {
        name: 'Scented Soy Candle Set',
        description: 'Hand-poured soy wax candles in 4 relaxing scents: lavender, vanilla, eucalyptus, and sandalwood. 40-hour burn time per candle.',
        price: 34.99,
        originalPrice: 44.99,
        category: 'Home & Living',
        image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.7,
        reviewCount: 289,
        stock: 200,
        tags: ['candle', 'soy', 'scented', 'relaxation']
    },
    {
        name: 'Luxury Throw Blanket',
        description: 'Ultra-soft microfiber throw blanket perfect for cozy evenings. Machine washable, fade-resistant, and available in multiple earth-tone colors.',
        price: 49.99,
        category: 'Home & Living',
        image: 'https://images.unsplash.com/photo-1580301762395-21ce6d555696?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.6,
        reviewCount: 174,
        stock: 95,
        tags: ['blanket', 'throw', 'cozy', 'home-decor']
    },
    {
        name: 'Vitamin C Brightening Serum',
        description: 'Professional-grade 20% Vitamin C serum with hyaluronic acid and vitamin E. Brightens skin, reduces dark spots, and boosts collagen production.',
        price: 39.99,
        originalPrice: 54.99,
        category: 'Beauty',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.8,
        reviewCount: 634,
        stock: 300,
        tags: ['serum', 'vitamin-c', 'skincare', 'brightening']
    },
    {
        name: 'Hair Care Gift Set',
        description: 'Complete hair care set featuring sulfate-free shampoo, deep conditioning mask, and argan oil serum. Perfect for all hair types.',
        price: 59.99,
        originalPrice: 79.99,
        category: 'Beauty',
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.5,
        reviewCount: 198,
        stock: 85,
        tags: ['haircare', 'shampoo', 'gift-set', 'argan-oil']
    },
    {
        name: 'Leather Card Wallet',
        description: 'Slim RFID-blocking card wallet crafted from full-grain leather. Holds up to 8 cards with a quick-access slot and minimalist design.',
        price: 44.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.4,
        reviewCount: 112,
        stock: 140,
        tags: ['wallet', 'leather', 'rfid', 'minimalist']
    },
    {
        name: 'Wireless Charging Pad',
        description: 'Fast 15W Qi-certified wireless charger compatible with all modern smartphones. Ultra-slim design with LED indicator and anti-slip surface.',
        price: 29.99,
        originalPrice: 39.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.3,
        reviewCount: 267,
        stock: 220,
        tags: ['charger', 'wireless', 'qi', 'fast-charging']
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Product.deleteMany({});
        console.log('Cleared existing products');

        await Product.insertMany(products);
        console.log(`Seeded ${products.length} products successfully`);

        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (err) {
        console.error('Seed failed:', err.message);
        process.exit(1);
    }
}

seed();
