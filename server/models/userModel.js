const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
require("dotenv").config()

const SALT_ROUNDS = 10; // You can adjust the salt rounds as needed
const SECRET_KEY = process.env.SECRET_KEY // Replace with your actual secret key

// Define the user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare the password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT
userSchema.methods.generateJWT = function () {
    return jwt.sign({ id: this._id, email: this.email }, SECRET_KEY, { expiresIn: '1h' });
};

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
