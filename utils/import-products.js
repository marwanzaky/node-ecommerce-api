require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const Product = require('../src/models/productModel');

// Connect to the MongoDB
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE.replace('<PASSWORD>', MONGO_DB_PASSWORD);

mongoose
    .connect(MONGO_DB_DATABASE)
    .then(() => console.log('DB connection successful!'))
    .catch(() => console.log('DB connection failed!'));

const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));

const importProducts = async () => {
    try {
        await Product.create(products);
        console.log('Products successfully imported!');
    }
    catch (err) {
        console.log(err);
    }

    process.exit();
}

const deleteProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Products successfully deleted!');
    }
    catch (err) {
        console.log(err);
    }

    process.exit();
}

if (process.argv[2] === '--import')
    importProducts();
else if (process.argv[2] === '--delete')
    deleteProducts();