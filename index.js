const express = require('express');
const fs = require('fs');
const cors = require('cors');
// const serverless = require('serverless-http');

const app = express();
const router = express.Router();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const productDataJson = fs.readFileSync(`${__dirname}/data/product-data.json`);
const productDataObj = JSON.parse(productDataJson);

const instagramDataJson = fs.readFileSync(`${__dirname}/data/instagram-data.json`);
const instagramDataObj = JSON.parse(instagramDataJson);

router.get('/products', (req, res) => {
    res.status(200).json(productDataObj);
});

router.get('/img/products/:name/:index', (req, res) => {
    res.status(200).sendFile(`${__dirname}/img/products/${req.params.name}/img-${req.params.index}.png`);
});

router.get('/instagram', (req, res) => {
    res.status(200).json(instagramDataObj);
});

router.get('/img/instagram/:name', (req, res) => {
    res.status(200).sendFile(`${__dirname}/img/instagram/${req.params.name}`);
});

app.use('/', router);

app.listen(port, () => {
    console.log('Server is listening...');
});

// module.exports.handler = serverless(app);