const Product = require('../models/productModel');
const factory = require('./handlerFactory');

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product, { path: 'reviews' });
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);

exports.getProductStats = async (req, res) => {
    try {
        const stats = await Product.aggregate([
            {
                $match: { averageRatings: { $gte: 4.5 } }
            },
            {
                $group: {
                    // _id: '$price',
                    _id: null,
                    numProducts: { $sum: 1 },
                    avgRatings: { $avg: '$averageRatings' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: { avgPrice: 1 }
            }
        ]);

        res.status(200).json({
            status: 'fail',
            message: stats
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}