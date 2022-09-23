const fs = require('fs');
const products = JSON.parse(fs.readFileSync(`${__dirname}/../../data/products.json`));

exports.checkID = (req, res, next) => {
    if (req.params.id * 1 > products.length - 1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalide ID'
        });
    }

    next();
}

exports.getAllProducts = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products
        }
    })
}

exports.getProductId = (req, res) => {
    const id = req.params.id * 1;
    const product = products[id];

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })
}