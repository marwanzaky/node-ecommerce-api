const mongoose = require('mongoose');

const schemaOptions = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price']
    },
    priceCompare: {
        type: Number,
        required: [true, 'A product must have a priceCompare']
    },
    imgs: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: [true, 'A product must have a description'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, schemaOptions);

productSchema.virtual('discount').get(function () {
    const discount = this.priceCompare - this.price;
    const discountPercent = discount / this.priceCompare * 100;
    return this.discount = `${Math.round(discountPercent)}%`;
});

productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;