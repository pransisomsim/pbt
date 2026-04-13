const bcrypt = require('bcryptjs'); // fixed typo + using bcryptjs
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class UserController {
    static async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Name, email, and password are required' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create(name, email, hashedPassword);
            res.status(201).json({ message: 'User registered successfully', userId: user.id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            const user = await User.findByEmail(email);

            const INVALID_MSG = 'Invalid email or password';

            if (!user) {
                return res.status(401).json({ error: INVALID_MSG });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ error: INVALID_MSG });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
            );

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
}

module.exports = UserController;
