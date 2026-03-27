const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// All order routes require authentication
router.route('/')
    .get(protect, admin, orderController.getAllOrders)
    .post(protect, orderController.createOrder);

router.route('/myorders')
    .get(protect, orderController.getMyOrders);

router.route('/:id')
    .get(protect, orderController.getOrderById);

router.route('/:id/status')
    .put(protect, admin, orderController.updateOrderStatus);

router.route('/:id/cancel')
    .put(protect, orderController.cancelOrder);

module.exports = router;
