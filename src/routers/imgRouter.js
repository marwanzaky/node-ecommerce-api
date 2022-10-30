const imgController = require('../controllers/imgController.js');
const express = require('express');

const router = express.Router();

router.get('/products/:name/:index', imgController.getImgProduct);
router.get('/users/:name', imgController.getImgUser);

module.exports = router;