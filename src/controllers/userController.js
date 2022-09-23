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

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user)
            throw 'No user found with that ID';

        res.status(201).json({
            status: 'success',
            data: user
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete(req.params.email);

        if (!user)
            throw 'No user found with that ID';

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}