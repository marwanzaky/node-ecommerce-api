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
    description: {
        type: String,
        required: [true, 'A product must have a description']
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;