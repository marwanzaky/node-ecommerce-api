const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const express = require('express');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
    .route('/')
    .get(reviewController.setProductFindOptionsId, reviewController.getAllReviews)
    .post(authController.restrictTo('user'), reviewController.setProductUserIds, reviewController.createReview);

router
    .route('/:id')
    .get(reviewController.getReview)
    .patch(authController.restrictTo('user', 'admin'), reviewController.updateReview)
    .delete(authController.restrictTo('user', 'admin'), reviewController.deleteReview);

module.exports = router;