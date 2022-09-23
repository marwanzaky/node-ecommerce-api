const imgController = require('../controllers/imgController.js');
const express = require('express');

const router = express.Router();

router.get('/products/:name/:index', imgController.getImgId);

module.exports = router;