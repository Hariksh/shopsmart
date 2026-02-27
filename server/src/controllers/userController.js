const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ msg: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.username = req.body.username || user.username;
            user.phone = req.body.phone || user.phone;

            // Note: In a real app we'd verify email uniqueness before allowing email updates
            // We'll skip email updates here just to keep the logic simple

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                phone: updatedUser.phone,
                role: updatedUser.role
            });
        } else {
            res.status(404).json({ msg: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        // Handle validation errors (e.g., phone number regex)
        if (err.name === 'ValidationError') {
            return res.status(400).json({ msg: err.message });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        // Since we don't have an Order model yet, we'll return mock data 
        // that's tied to the current user to satisfy the UI requirement.
        const mockOrders = [
            {
                _id: 'ord_' + Math.floor(Math.random() * 1000000),
                createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
                totalPrice: 129.99,
                isPaid: true,
                isDelivered: false,
                orderItems: [
                    { name: 'Wireless Headphones', qty: 1, price: 129.99 }
                ]
            },
            {
                _id: 'ord_' + Math.floor(Math.random() * 1000000),
                createdAt: new Date(Date.now() - 86400000 * 15), // 15 days ago
                totalPrice: 45.50,
                isPaid: true,
                isDelivered: true,
                orderItems: [
                    { name: 'Ergonomic Mouse', qty: 1, price: 45.50 }
                ]
            }
        ];

        res.json(mockOrders);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};
