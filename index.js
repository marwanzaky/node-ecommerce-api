require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8000;

// Connect to the MongoDB
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_DB_CONNECTION = process.env.MONGO_DB_CONNECTION.replace('PASSWORD', MONGO_DB_PASSWORD);
console.log(MONGO_DB_CONNECTION);
mongoose
    .connect(MONGO_DB_CONNECTION)
    .then(() => console.log('DB connection successful!'));

// Routes
const productRoute = require('./src/routers/productRoute');
const imgRoute = require('./src/routers/imgRoute');
const paymentRoute = require('./src/routers/paymentRoute');
const userRoute = require('./src/routers/userRoute');

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/products', productRoute);
app.use('/api/v1/img', imgRoute);
app.use('/api/v1/payment', paymentRoute);
app.use('/api/v1/user', userRoute);

// OTHERS
router.get('/instagram', (req, res) => {
    res.status(200).json(instagramData);
});

app.use('/', router);

app.listen(PORT, () => console.log('Server is listening...'));