const User = require('../models/userModel');

exports.signUp = async function (req, res, next) {
    try {
        const newUser = User.create(req.body);

        res.status(201).json({
            status: 'success',
            data: { user: newUser }
        });
    }
    catch (err) {
        console.log(err);
    }
}