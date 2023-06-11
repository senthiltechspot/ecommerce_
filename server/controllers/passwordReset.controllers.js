const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendResetPasswordEmail } = require('../utils/mailer');
const User = require('../models/user.model');

// Send reset password link to email
exports.sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Generate a JWT token with user ID
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
    // Create a reset password URL
    const resetPasswordUrl = `http://your-website.com/reset-password/${token}`;
    
    // Send reset password email
    sendResetPasswordEmail(email, resetPasswordUrl);
    
    res.json({ message: 'Reset password email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Confirm and update password
exports.confirmResetPassword = async (req, res) => {
    const { token, password } = req.body;
    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken.userId;

        // Find the user by ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
