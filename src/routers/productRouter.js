const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const reviewRoute = require('../routers/reviewRoute');
const express = require('express');

const router = express.Router();

router.use('/:productId/reviews', reviewRoute)

router
    .route('/')
    .get(productController.getAllProducts)
    .post(authController.protect, authController.restrictTo('admin', 'lead-guide'), productController.createProduct);

router.get('/stats', productController.getProductStats);

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(authController.protect, authController.restrictTo('admin', 'lead-guide'), productController.updateProduct)
    .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), productController.deleteProduct)

module.exports = router;