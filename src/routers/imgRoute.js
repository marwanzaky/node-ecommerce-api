const imgController = require('../controllers/imgController.js');
const express = require('express');

const router = express.Router();

router
    .route('/products/:name/:index')
    .get(imgController.getImgId);

router
    .route('/instagram/:name')
    .get(imgController.getImgInstaId);

module.exports = router;