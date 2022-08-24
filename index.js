const express = require('express');
const fs = require('fs');
const cors = require('cors');
// const serverless = require('serverless-http');

const app = express();
const router = express.Router();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const productData = JSON.parse(fs.readFileSync(`${__dirname}/data/product-data.json`));
const instagramData = JSON.parse(fs.readFileSync(`${__dirname}/data/instagram-data.json`));

router.get('/products', (req, res) => {
    res.status(200).json(productData);
});

router.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const productDataId = productData[id];
    res.status(200).json(productDataId);
});

router.get('/img/products/:name/:index', (req, res) => {
    res.status(200).sendFile(`${__dirname}/img/products/${req.params.name}/img-${req.params.index}.png`);
});

router.get('/instagram', (req, res) => {
    res.status(200).json(instagramData);
});

router.get('/img/instagram/:name', (req, res) => {
    res.status(200).sendFile(`${__dirname}/img/instagram/${req.params.name}`);
});

app.use('/', router);

app.listen(port, () => {
    console.log('Server is listening...');
});

// module.exports.handler = serverless(app);