const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const express = require('express');

const router = express.Router();

router.get('/', authController.protect, authController.restrictTo('admin', 'lead-guide'), userController.getAllUsers);

router
    .route('/:email')
    .get(authController.protect, authController.restrictTo('admin', 'lead-guide'), userController.getUser)
    .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), userController.deleteUser);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);

module.exports = router;