const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        validate: [validator.isEmail, 'Please enter a valid email'],
        lowercase: true,
        unique: true
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password']
    }
});

const User = mongoose.model('User', userSchema);

// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/test');
// } 