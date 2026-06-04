const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {

    const {
        username,
        email,
        password
    } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    const checkUserQuery =
        'SELECT * FROM users WHERE email = ?';

    db.query(
        checkUserQuery,
        [email],
        async (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length > 0) {
                return res.status(409).json({
                    message: 'Email already exists'
                });
            }

            const employeeQuery =
                'SELECT id FROM employees WHERE email = ?';

            db.query(
                employeeQuery,
                [email],
                async (err, employeeResult) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    const role =
                        employeeResult.length > 0
                            ? 'employee'
                            : 'user';

                    const hashedPassword =
                        await bcrypt.hash(
                            password,
                            10
                        );

                    const query = `
                        INSERT INTO users
                        (
                            username,
                            email,
                            password,
                            role
                        )
                        VALUES
                        (
                            ?,
                            ?,
                            ?,
                            ?
                        )
                    `;

                    db.query(
                        query,
                        [
                            username,
                            email,
                            hashedPassword,
                            role
                        ],
                        (err, result) => {

                            if (err) {
                                return res.status(500).json(err);
                            }

                            res.status(201).json({
                                message:
                                'User Registered Successfully',
                                role
                            });

                        }
                    );

                }
            );

        }
    );

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
// Change Password
exports.changePassword = async (req, res) => {

    const {
        currentPassword,
        newPassword
    } = req.body;

    const userId = req.user.id;

    if (
        !currentPassword ||
        !newPassword
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const query =
        "SELECT * FROM users WHERE id = ?";

    db.query(
        query,
        [userId],
        async (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            const user = results[0];

            const isMatch =
                await bcrypt.compare(
                    currentPassword,
                    user.password
                );

            if (!isMatch) {
                return res.status(400).json({
                    message:
                    "Current password is incorrect"
                });
            }

            const hashedPassword =
                await bcrypt.hash(
                    newPassword,
                    10
                );

            db.query(
                `
                UPDATE users
                SET password = ?
                WHERE id = ?
                `,
                [
                    hashedPassword,
                    userId
                ],
                (err, result) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.status(200).json({
                        message:
                        "Password updated successfully"
                    });

                }
            );

        }
    );

};