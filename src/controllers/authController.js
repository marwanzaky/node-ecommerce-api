const User = require('../models/userModel');

exports.signup = async function (req, res, next) {
    try {
        const newUser = await User.create(req.body);
        console.log('New user sign up successful');
        res.status(201).json({
            status: 'success',
            data: { user: newUser }
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'failed',
            message: 'The user already have an account'
        });
        console.log(err);
    }
}