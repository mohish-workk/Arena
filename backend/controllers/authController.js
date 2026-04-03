const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate JWT Helper
const generateToken = (id, email, name, role) => {
    return jwt.sign({ id, email, name, role }, process.env.JWT_SECRET || 'secret_key_mock_fallback_arena_one', {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, error: 'Email is already registered' });
        }

        const user = await User.create({ name, email, password });
        const token = generateToken(user._id, user.email, user.name, user.role);

        res.status(201).json({ success: true, token, user: { name: user.name, email: user.email, role: user.role }});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide an email and password' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const token = generateToken(user._id, user.email, user.name, user.role);
        res.status(200).json({ success: true, token, user: { name: user.name, email: user.email, role: user.role }});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ success: false, error: 'There is no active user associated with that email' });
        }

        // Generate token
        const resetToken = crypto.randomBytes(20).toString('hex');
        
        // Hash and store
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        // SIMULATE SENDING EMAIL:
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        console.log(`\n=========================================\n[MOCK EMAIL SENT]\nPassword reset URL for ${user.email}:\n${resetUrl}\n=========================================\n`);

        res.status(200).json({ success: true, data: 'Check backend console for the mock email containing the reset link' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resetToken
// @access  Public
exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid token or token has expired' });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save();

        const token = generateToken(user._id, user.email, user.name);
        res.status(200).json({ success: true, token, user: { name: user.name, email: user.email }});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
