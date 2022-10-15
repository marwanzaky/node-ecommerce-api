const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const express = require('express');

const router = express.Router();

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.get('/', authController.protect, authController.restrictTo('admin', 'lead-guide'), userController.getAllUsers);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

router
    .route('/:id')
    .get(authController.protect, authController.restrictTo('admin', 'lead-guide'), userController.getUser)
    .patch(authController.protect, authController.restrictTo('admin', 'lead-guide'), userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), userController.deleteUser);

module.exports = router;