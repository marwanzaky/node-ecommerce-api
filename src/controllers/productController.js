const { convertIdToName } = require('../../utils/convertStr');
const Product = require('../models/productModel');
const factory = require('./handlerFactory');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('reviews');

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getProduct = async (req, res) => {
    const name = convertIdToName(req.params.id);
    const product = await Product.findOne({ name }).populate('reviews');

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
}

exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);