// controllers/usersController.js
const User = require('../models/userModel');

// Create a new User
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({
            name, email, password
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(200).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "User not found" });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
