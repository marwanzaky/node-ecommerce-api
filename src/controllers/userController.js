const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(201).json({
            status: 'success',
            data: users
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}