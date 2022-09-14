const authController = require('../controllers/authController');
const express = require('express');

const router = express.Router();

router
    .route('/signup')
    .post(authController.signup);

module.exports = router;