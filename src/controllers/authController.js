const { promisify } = require('util');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

exports.signup = async function (req, res, next) {
    try {
        const newUser = await User.create(req.body);
        const token = signToken(newUser._id);
        console.log('New user sign up successful');
        res.status(201).json({
            status: 'success',
            token,
            data: { user: newUser }
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'The user already have an account'
        });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            throw 'Please provide an email and a password';

        const user = await User.findOne({ email }).select('+password');
        const isCorrect = async () => await user.correctPassword(password, user.password);

        if (!user || !await isCorrect())
            throw 'Incorrect password or email';

        const token = signToken(user._id);

        res.status(201).json({
            status: 'success',
            token
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];

        if (!token)
            throw 'You are not logged in, Please log in to get access';

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);     // ! This should have a custom error handler...
        const currentUser = await User.findById(decoded.id);

        if (!currentUser)
            throw 'The user belonging to this token does no longer exist';

        if (currentUser.changedPasswordAfter(decoded.iat))
            throw 'User recently changed password, Please log in again';

        req.user = currentUser;
        next();
    }
    catch (err) {
        res.status(401).json({
            status: 'fail',
            message: err
        });
    }
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role))
                throw 'You do not have permission to perform this action';

            next();
        }
        catch (err) {
            res.status(403).json({
                status: 'fail',
                message: err
            });
        }
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);

        if (!user)
            throw 'No user found with that email';

        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });

        res.status(201).json({
            status: 'success',
            user
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}