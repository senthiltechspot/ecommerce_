const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { Op } = require('sequelize');

// User signup
exports.signup = async (req, res) => {
    const { name, username, password, email, profilePicture } = req.body;

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({
            where: { [Op.or]: [{ username }, { email }] },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            name,
            username,
            password: hashedPassword,
            email,
            profilePicture,
            userType: "customer",
        });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({
            userId: user.id, name: user.name,
            username: user.username,
            email: user.email,
            userType: user.userType,
        }, process.env.SECRET_KEY, { expiresIn: 86400 });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
