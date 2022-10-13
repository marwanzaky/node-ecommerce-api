const express = require('express');
const cors = require('cors');

const app = express();

// Routers
const userRouter = require('./src/routers/userRouter');
const productRouter = require('./src/routers/productRouter');
const imgRouter = require('./src/routers/imgRouter');
const paymentRouter = require('./src/routers/paymentRouter');

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/imgs', imgRouter);
app.use('/api/v1/payment', paymentRouter);

module.exports = app;