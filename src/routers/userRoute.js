const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const express = require('express');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/', authController.protect, userController.getAllUsers);


module.exports = router;