const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(categoryController.getCategories)
    .post(protect, admin, categoryController.createCategory);

router.route('/:slug')
    .get(categoryController.getCategoryBySlug);

router.route('/id/:id')
    .put(protect, admin, categoryController.updateCategory)
    .delete(protect, admin, categoryController.deleteCategory);

module.exports = router;
