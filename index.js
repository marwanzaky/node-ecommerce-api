const express = require('express');
const url = require('url');
const fs = require('fs');
const cors = require('cors');

const app = express();

const productDataJson = fs.readFileSync(`${__dirname}/data/product-data.json`);
const productDataObj = JSON.parse(productDataJson);

app.use(cors());

app.get('/products', (req, res) => {
    res.status(200).json(productDataObj);
});

app.get('/img/products/anniversary-gift-for-him.png', (req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    res.status(200).sendFile(`${__dirname}${pathname}`);
});

app.get('/img/products/personalised-notebook.png', (req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    res.status(200).sendFile(`${__dirname}${pathname}`);
});

app.get('/img/products/soft-cover-journal.png', (req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    res.status(200).sendFile(`${__dirname}${pathname}`);
});

app.get('/img/products/spiral-notebook.png', (req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    res.status(200).sendFile(`${__dirname}${pathname}`);
});

app.listen(8000, () => {
    console.log('Server is listening...');
})