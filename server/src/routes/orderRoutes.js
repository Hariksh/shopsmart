const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/myorders')
    .get(protect, userController.getMyOrders);

module.exports = router;
