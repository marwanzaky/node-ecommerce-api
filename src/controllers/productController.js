const fs = require('fs');
const productData = JSON.parse(fs.readFileSync(`${__dirname}/../../data/product-data.json`));

exports.getAllProducts = (req, res) => {
    res.status(200).json(productData);
}

exports.getProductId = (req, res) => {
    const id = req.params.id;
    const productDataId = productData[id];
    res.status(200).json(productDataId);
}