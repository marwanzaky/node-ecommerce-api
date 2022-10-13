const productController = require('../controllers/productDBController');
const express = require('express');

const router = express.Router();

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