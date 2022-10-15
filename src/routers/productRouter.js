const productController = require('../controllers/productController');
const reviewRoute = require('../routers/reviewRoute');
const express = require('express');

const router = express.Router();

router.use('/:productId/reviews', reviewRoute)

router
    .route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct);

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router;