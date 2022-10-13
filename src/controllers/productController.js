const { convertIdToName } = require('../../utils/convertStr');
const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

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
    const product = await Product.findOne({ name });

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
}

exports.createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                product: newProduct
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const name = convertIdToName(req.params.id);
        const currentProduct = await Product.findOne({ name });

        if (!currentProduct)
            throw 'No product found with that name';

        const updatedProduct = await Product.findOneAndUpdate({ name }, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                product: updatedProduct
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const name = convertIdToName(req.params.id);
        await Product.findOneAndDelete({ name });

        res.status(204).json({
            status: 'success',
            data: null
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        });
    }
}