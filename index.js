require('dotenv').config();

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const app = express();
const router = express.Router();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const productData = JSON.parse(fs.readFileSync(`${__dirname}/data/product-data.json`));
const instagramData = JSON.parse(fs.readFileSync(`${__dirname}/data/instagram-data.json`));

// Products
const getAllProducts = (req, res) => {
    res.status(200).json(productData);
}

const getProductId = (req, res) => {
    const id = req.params.id;
    const productDataId = productData[id];
    res.status(200).json(productDataId);
}

// Create checkout session
const createCheckoutSession = async (req, res) => {
    try {
        const line_items = req.body.items.map(item => {
            const line_item = productData[item.id];

            return {
                price_data: {
                    currency: 'usd',
                    product_data: { name: line_item.name },
                    unit_amount: line_item.price
                },
                quantity: item.quantity
            }
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.SERVER_URL}/success`,
            cancel_url: `${process.env.SERVER_URL}/cancel`,
            line_items: line_items
        });

        res.json({ url: session.url });

    } catch (err) {
        res.status(500).json({ error: err.message });
    };
}

router.get('/products', getAllProducts);
router.get('/products/:id', getProductId);

router.get('/img/products/:name/:index', (req, res) => {
    res.status(200).sendFile(`${__dirname}/img/products/${req.params.name}/img-${req.params.index}.png`);
});

router.get('/instagram', (req, res) => {
    res.status(200).json(instagramData);
});

router.get('/img/instagram/:name', (req, res) => {
    res.status(200).sendFile(`${__dirname}/img/instagram/${req.params.name}`);
});

router.post('/create-checkout-session', createCheckoutSession);

app.use('/', router);

app.listen(port, () => {
    console.log('Server is listening...');
});