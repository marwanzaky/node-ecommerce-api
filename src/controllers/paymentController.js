const Product = require('../models/productModel');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

exports.createCheckoutSession = async (req, res) => {
    try {
        const products = await Product.find();
        const line_items = req.body.items.map(item => {
            const line_item = products[item.id];

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