const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // For environment variables

const app = express(); // Initialize express app
const port = 4001;
const email = 'na23b035@smail.iitm.ac.in'
const password = 'TmqQ5w9tcFE'

// Enable CORS for all origins (can restrict origins if needed)
app.use(cors());

// Middleware to parse incoming JSON data
app.use(express.json());

// Configure email settings (use your email credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail',//.............venne matiya mathi
    auth: {
        user: 'testusersodium@gmail.com', // Your email address.................................................................................................................................................
        pass: 'fyeioutovnmirglx',             // Your email password (use an app password if necessary).....................................................................................................................
    },
});

// Define the POST route to handle form submissions
app.post('/login', (req, res) => {
    // Destructure form data from the request body
    const { fullName, email, phone, message } = req.body;

    // Log the received data (optional for debugging)
    console.log('Form Data Received:', { fullName, email, phone, message });

    // Check if any field is missing
    if (!fullName || !email || !phone || !message) {
        return res.status(400).send('All fields are required!');
    }

    // Create email options
    const mailOptions = {
        from: 'testusersodium@gmail.com', // Sender email........................................................................................................................
        to: 'udaymadavana40@gmail.com',   // Recipient email...........................................................................................
        subject: 'New Contact Form Submission',
        text: `
            Name: ${fullName} 
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
        `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email.');
        }
        console.log('Email sent:', info.response);
        return res.status(200).send('Email sent successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
