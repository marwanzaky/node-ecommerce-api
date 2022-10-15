const Product = require('../models/productModel');
const factory = require('./handlerFactory');

exports.getAllProducts = factory.getAll(Product, { path: 'reviews' });
exports.getProduct = factory.getOne(Product, { path: 'reviews' });
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);