const mongoose = require('mongoose');
const Product = require('./productModel');

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

reviewSchema.statics.calcAverageRatings = async function (productId) {
    const stats = await this.aggregate([
        {
            $match: { product: productId }
        },
        {
            $group: {
                _id: '$product',
                numRating: { $sum: 1 },
                avgRating: { $avg: '$rating' },
            }
        }
    ]);

    await Product.findByIdAndUpdate(productId, {
        numReviews: stats.length > 0 ? stats[0].numRating : 0,
        avgRatings: stats.length > 0 ? stats[0].avgRating : 0
    });
}

reviewSchema.post('save', async function () {
    await this.constructor.calcAverageRatings(this.product);
});

const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review;
