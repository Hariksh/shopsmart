const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const { category, search, sort, page = 1, limit = 12 } = req.query;

        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        let sortOption = { createdAt: -1 };
        switch (sort) {
            case 'price_asc':
                sortOption = { price: 1 };
                break;
            case 'price_desc':
                sortOption = { price: -1 };
                break;
            case 'rating':
                sortOption = { rating: -1 };
                break;
            case 'newest':
                sortOption = { createdAt: -1 };
                break;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [products, total] = await Promise.all([
            Product.find(filter)
                .sort(sortOption)
                .skip(skip)
                .limit(parseInt(limit)),
            Product.countDocuments(filter)
        ]);

        res.json({
            products,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalProducts: total
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
};
