const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'your-email-service',
    auth: {
        user: 'your-email',
        pass: 'your-email-password',
    },
});

// Send reset password email
const sendResetPasswordEmail = (email, resetPasswordUrl) => {
    const mailOptions = {
        from: 'your-email',
        to: email,
        subject: 'Reset Your Password',
        html: `Click the link below to reset your password:<br/><a href="${resetPasswordUrl}">${resetPasswordUrl}</a>`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to send reset password email' });
        }
        console.log('Reset password email sent successfully');
    });
};

module.exports = { sendResetPasswordEmail };
