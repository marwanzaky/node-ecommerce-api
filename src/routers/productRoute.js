const productController = require('../controllers/productController');
const express = require('express');

const router = express.Router();

router
    .route('/')
    .get(productController.getAllProducts);

router
    .route('/:id')
    .get(productController.getProductId);

module.exports = router;