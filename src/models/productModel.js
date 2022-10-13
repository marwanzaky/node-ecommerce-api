const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        unique: true
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
    reviews: [{
        "fullname": String,
        "date": String,
        "stars": String,
        "review": String
    }],
    description: {
        type: String,
        required: [true, 'A product must have a description']
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;