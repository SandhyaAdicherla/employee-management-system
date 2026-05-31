const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    const checkUserQuery =
        'SELECT * FROM users WHERE email = ?';

    db.query(checkUserQuery, [email], async (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (results.length > 0) {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users
            (username,email,password,role)
            VALUES(?,?,?,?)
        `;

        db.query(
            query,
            [
                username,
                email,
                hashedPassword,
                'employee'
            ],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.status(201).json({
                    message: 'User Registered Successfully'
                });
            }
        );
    });
};

// Login User
exports.login = (req, res) => {

    const { email, password } = req.body;

    const query =
        'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: 'Invalid Credentials'
            });
        }

        const user = results[0];

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid Credentials'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    });
};

// User Profile
exports.profile = (req, res) => {

    res.status(200).json({
        user: req.user
    });
};