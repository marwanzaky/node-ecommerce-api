const User = require('../models/userModel');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
    const filteredObj = {};

    Object.keys(obj).forEach(key => {
        if (allowedFields.includes(key))
            filteredObj[key] = obj[key];
    });

    return filteredObj;
}

exports.updateMe = async (req, res) => {
    try {
        if (req.body.password || req.body.passwordConfirm)
            throw 'This route is not for password updates, Please use /updateMyPassword';

        const filteredBody = filterObj(req.body, 'name', 'email');
        const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: { user: updatedUser }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.deleteMe = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, { active: false });

        if (!user)
            throw 'No user found with that ID';

        res.status(204).json({
            status: 'success',
            data: null
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

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
        const user = await User.findById(req.params.id);

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

exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);