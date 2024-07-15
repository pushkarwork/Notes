const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
    try {
        // Extract the JWT token from the request headers, cookies, or query parameters
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Assuming token is sent in the Authorization header as 'Bearer <token>'

        if (!token) {
            return res.status(401).json({ error: 'Authorization token required' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decodedToken)

        // Extract user id from decoded token
        const userId = decodedToken.id;

        // Fetch user details from the database
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Attach user object to request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error authenticating user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = authenticateUser;