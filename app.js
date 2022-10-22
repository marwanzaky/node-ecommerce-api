const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();

// Routers
const userRouter = require('./src/routers/userRouter');
const productRouter = require('./src/routers/productRouter');
const reviewRoute = require('./src/routers/reviewRoute');
const imgRouter = require('./src/routers/imgRouter');
const paymentRouter = require('./src/routers/paymentRouter');

// Middlewares
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again later'
});

app.use(helmet());
app.use('/api', limiter);
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/imgs', imgRouter);
app.use('/api/v1/payment', paymentRouter);

module.exports = app;