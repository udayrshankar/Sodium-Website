const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4001;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public folder
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/login', (req, res) => {
    const { fullName, email, phone, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'your-email@example.com', // Replace with your email
        subject: 'Contact Form Submission',
        text: `
            Name: ${fullName}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending email');
        }
        res.send('Email sent successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
