const Order = require('../models/Order');
const Product = require('../models/Product');

// Valid status transitions: current → allowed next statuses
const STATUS_TRANSITIONS = {
    'Placed': ['Accepted', 'Cancelled'],
    'Accepted': ['Packed', 'Cancelled'],
    'Packed': ['Shipped'],
    'Shipped': ['Delivered'],
    'Delivered': [],
    'Cancelled': []
};

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ msg: 'No order items provided' });
        }

        if (!shippingAddress || !shippingAddress.address || !shippingAddress.city ||
            !shippingAddress.postalCode || !shippingAddress.country) {
            return res.status(400).json({ msg: 'Complete shipping address is required' });
        }

        // Validate products exist and have sufficient stock
        const productIds = orderItems.map(item => item.product);
        const products = await Product.find({ _id: { $in: productIds } });

        if (products.length !== productIds.length) {
            return res.status(400).json({ msg: 'One or more products not found' });
        }

        const productMap = {};
        products.forEach(p => { productMap[p._id.toString()] = p; });

        // Build validated order items and calculate total
        let totalPrice = 0;
        const validatedItems = [];

        for (const item of orderItems) {
            const product = productMap[item.product];
            if (!product) {
                return res.status(400).json({ msg: `Product ${item.product} not found` });
            }
            if (product.stock < item.qty) {
                return res.status(400).json({
                    msg: `Insufficient stock for "${product.name}". Available: ${product.stock}, Requested: ${item.qty}`
                });
            }

            validatedItems.push({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                qty: item.qty
            });
            totalPrice += product.price * item.qty;
        }

        // Atomically decrement stock for all products
        for (const item of validatedItems) {
            const result = await Product.findOneAndUpdate(
                { _id: item.product, stock: { $gte: item.qty } },
                { $inc: { stock: -item.qty } },
                { new: true }
            );

            if (!result) {
                // Rollback previously decremented stock
                for (const prevItem of validatedItems) {
                    if (prevItem.product.toString() === item.product.toString()) break;
                    await Product.findByIdAndUpdate(prevItem.product, {
                        $inc: { stock: prevItem.qty }
                    });
                }
                return res.status(400).json({
                    msg: `Stock became unavailable for "${item.name}" during order placement. Please try again.`
                });
            }
        }

        const order = new Order({
            user: req.user._id,
            orderItems: validatedItems,
            shippingAddress,
            paymentMethod: paymentMethod || 'COD',
            totalPrice: Math.round(totalPrice * 100) / 100,
            isPaid: paymentMethod === 'Card' || paymentMethod === 'UPI',
            paidAt: (paymentMethod === 'Card' || paymentMethod === 'UPI') ? Date.now() : undefined,
            status: 'Placed',
            statusHistory: [{
                status: 'Placed',
                changedAt: Date.now(),
                changedBy: req.user._id
            }]
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'username email')
            .populate('orderItems.product', 'name image price stock');

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Users can only view their own orders; admins can view any
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Not authorized to view this order' });
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [orders, total] = await Promise.all([
            Order.find({ user: req.user._id })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .populate('orderItems.product', 'name image price'),
            Order.countDocuments({ user: req.user._id })
        ]);

        res.json({
            orders,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalOrders: total
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
    try {
        const { page = 1, limit = 20, status } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const filter = {};
        if (status) filter.status = status;

        const [orders, total] = await Promise.all([
            Order.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .populate('user', 'username email')
                .populate('orderItems.product', 'name image price'),
            Order.countDocuments(filter)
        ]);

        res.json({
            orders,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalOrders: total
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ msg: 'Status is required' });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Validate status transition
        const allowedTransitions = STATUS_TRANSITIONS[order.status];
        if (!allowedTransitions || !allowedTransitions.includes(status)) {
            return res.status(400).json({
                msg: `Cannot transition from "${order.status}" to "${status}". Allowed: ${allowedTransitions.join(', ') || 'none'}`
            });
        }

        order.status = status;
        order.statusHistory.push({
            status,
            changedAt: Date.now(),
            changedBy: req.user._id
        });

        // Mark as delivered
        if (status === 'Delivered' && !order.isPaid && order.paymentMethod === 'COD') {
            order.isPaid = true;
            order.paidAt = Date.now();
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @desc    Cancel an order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Users can only cancel their own orders; admins can cancel any
        if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Not authorized to cancel this order' });
        }

        // Can only cancel orders that are Placed or Accepted
        const cancellableStatuses = ['Placed', 'Accepted'];
        if (!cancellableStatuses.includes(order.status)) {
            return res.status(400).json({
                msg: `Cannot cancel order with status "${order.status}". Only Placed or Accepted orders can be cancelled.`
            });
        }

        // Restore stock for all order items
        for (const item of order.orderItems) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: item.qty }
            });
        }

        order.status = 'Cancelled';
        order.statusHistory.push({
            status: 'Cancelled',
            changedAt: Date.now(),
            changedBy: req.user._id
        });

        const updatedOrder = await order.save();
        res.json({ msg: 'Order cancelled successfully', order: updatedOrder });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
};
