const productController = require('../controllers/productController');
const express = require('express');

const router = express.Router();

router.param('id', productController.checkID);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductId);

module.exports = router;