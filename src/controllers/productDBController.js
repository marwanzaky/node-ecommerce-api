const Product = require('../models/productModel');

exports.getAllProducts = (req, res) => {
    const products = [];

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products
        }
    });
}

exports.getProduct = (req, res) => {
    // const product = await Product;

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

exports.updateProduct = (req, res) => {
    const product = {};

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
}

exports.deleteProduct = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
}