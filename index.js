const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4001;

// Middleware
app.use(cors({
    origin: 'https://udayrshankar.github.io', // Replace with your GitHub Pages domain
    methods: ['POST'], // Allow only POST requests
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (optional)
app.use(express.static('public'));

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testusersodium@gmail.com', // Your email address
        pass: 'fyeioutovnmirglx', // Your email password or app password
    },
});

// POST route for contact form
app.post('/login', (req, res) => {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !phone || !message) {
        return res.status(400).send('All fields are required.');
    }

    const mailOptions = {
        from: 'testusersodium@gmail.com',
        to: 'udaymadavana40@gmail.com', // Replace with your email address
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
            console.error('Error:', error);
            return res.status(500).send('Error sending email');
        }
        res.send('Email sent successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
