const express = require('express');
const url = require('url');
const fs = require('fs');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

const productDataJson = fs.readFileSync(`${__dirname}/data/product-data.json`);
const productDataObj = JSON.parse(productDataJson);

const instagramDataJson = fs.readFileSync(`${__dirname}/data/instagram-data.json`);
const instagramDataObj = JSON.parse(instagramDataJson);

app.use(cors());
app.use(express.json());

const getAllProducts = (req, res) => {
    res.status(200).json(productDataObj);
};

const getProductImg = (req, res) => {
    res.status(200).sendFile(`${__dirname}/img/products/${req.params.name}/img-${req.params.index}.png`);
};

const getInstagram = (req, res) => {
    res.status(200).json(instagramDataObj);
};

const getInstaImg = (req, res) => {
    res.status(200).sendFile(`${__dirname}/img/instagram/${req.params.name}`);
}

router.get('/products', getAllProducts);
router.get('/img/products/:name/:index', getProductImg);

router.get('/instagram', getInstagram);
router.get('/img/instagram/:name', getInstaImg);

app.use('/.netlify/functions/index', router);

// app.listen(8000, () => {
//     console.log('Server is listening...');
// });

module.exports.handler = serverless(app);