const crypto = require('crypto');
const { promisify } = require('util');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Email = require('../../utils/email');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

const createSendToken = (res, user, statusCode) => {
    user.password = undefined;

    const token = signToken(user._id);

    const cookieOptions = {
        // expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };

    res.status(statusCode).cookie('jwk', token, cookieOptions).json({
        status: 'success',
        token,
        data: { user }
    });
}

exports.signup = async function (req, res) {
    try {
        const newUser = await User.create(req.body);
        const url = `${req.protocol}://${req.get('host')}/me`;

        if (process.env.NODE_ENV === 'production')
            url = 'https://mamolio.com/me'

        await new Email(newUser, url).sendWelcome();
        createSendToken(res, newUser, 201);
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'The user already have an account'
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            throw 'Please provide an email and a password';     // 400

        const user = await User.findOne({ email }).select('+password');
        const isCorrect = async () => await user.correctPassword(password, user.password);

        if (!user || !await isCorrect())
            throw 'Incorrect password or email';

        createSendToken(res, user, 200);
    }
    catch (err) {
        res.status(401).json({
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

        if (!user)
            throw 'No user found with that email';

        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });

        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
        const message = `Forgot your password? Submit a PATCH request with your new password and confirmPassword to: ${resetURL}.
If you didn't forgot your password, please ignore this email.`;

        try {
            // ! This code should be fixed
            // await Email({
            //     email: user.email,
            //     subject: 'Your password reset token (valid for 10 mins)',
            //     message
            // });

            res.status(200).json({
                status: 'success',
                message: 'Token sent to email'
            });
        }
        catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });

            res.status(500).json({
                status: 'fail',
                user,
                message: 'There was an error sending the email, Try again later.'
            });
        }
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        console.log(req.params.token);

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user)
            throw 'Token is invalid or has expired'

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        createSendToken(res, user, 200);
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('+password');;
        const isCorrect = await user.correctPassword(req.body.passwordCurrent, user.password);

        if (!isCorrect)
            throw 'Incorrect current password';

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;

        await user.save();

        createSendToken(res, user, 200);
    }
    catch (err) {
        res.status(401).json({
            status: 'fail',
            message: err
        });
    }
}