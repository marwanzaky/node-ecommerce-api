const mongoose = require('mongoose');

const schemaOptions = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'A review must have a rating']
    },
    review: {
        type: String,
        required: [true, 'A review must have a review'],
        trim: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'A review must belong to a product'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A review must belong to a user'],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, schemaOptions);

reviewSchema.pre(/^find/, function (next) {
    this
        // .populate({
        //     path: 'product',
        //     select: 'name'
        // })
        .populate({
            path: 'user',
            select: 'name photo'
        });

    next();
});

const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review;
