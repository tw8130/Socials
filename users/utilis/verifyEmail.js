const nodemailer = require('nodemailer');
require('dotenv').config();
const email_config = require('../config/emailConfig');

// const message_options = {
//     to: ['samgitonga66@gmail.com', 'muchuicollins56@gmail.com', 'mwangitabitha2020@gmail.com'],
//     from: process.env.EMAIL_USER,
//     subject: "Welcome to our store",
//     text: "Yaay this works!",

// }


const transporter = nodemailer.createTransport(email_config)


const sendResetPasswordEmail = (email, resetLink) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Your Password',
        html: `<p>Please click the following link to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending reset password email:', error);
        } else {
            console.log('Reset password email sent:', info.response);
        }
    });
};

module.exports = { sendResetPasswordEmail };