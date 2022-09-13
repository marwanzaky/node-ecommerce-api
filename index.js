require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8000;

// Routes
const productRoute = require('./src/routers/productRoute');
const imgRoute = require('./src/routers/imgRoute');
const paymentRoute = require('./src/routers/paymentRoute');

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/products', productRoute);
app.use('/api/v1/img', imgRoute);
app.use('/api/v1/payment', paymentRoute);

// OTHERS
router.get('/instagram', (req, res) => {
    res.status(200).json(instagramData);
});

app.use('/', router);

app.listen(PORT, () => console.log('Server is listening...'));