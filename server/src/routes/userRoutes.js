const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile')
    .get(protect, userController.getUserProfile)
    .put(protect, userController.updateUserProfile);

module.exports = router;
