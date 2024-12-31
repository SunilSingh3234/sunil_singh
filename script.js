let menuIcon =document.querySelector('#menu-icon');
let navbar =document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

};





let sections=document.querySelectorAll('section');
let navLinks=document.querySelectorAll("header nav a")

window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset =sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if(top >= offset && top < offset + height){
                navLinks.forEach(links =>{
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*='+ id +']').classList.add('active');
                });
            };
        });
        let header =document.querySelector('header');

        header.classList.toggle('sticky',window.scrollY > 100);

        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');

};

ScrollReveal({ 
    distance:'80px',
    duration:2000,
    delay: 200
});

ScrollReveal().reveal('.home-content,.heading',{ origin:'top'});
ScrollReveal().reveal('.home-img,.services-container,.portfolio-box,.contact form',{ origin:'bottom'});
ScrollReveal().reveal('.home-content h1,.about-img',{ origin:'left'});
ScrollReveal().reveal('.home-content p,.about-content',{ origin:'right'});

const typed = new Typed('.multiple-text',
    {
        strings: ['Frontend Deveoper','Data Scientest','Video Editor','Photo Editor'
        ],
        typeSpeed:100,
        backSpeed:70,
        backDelay:1000,
        loop: true
    }
);






// code for contact us page

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files for frontend feedback

// Route to handle form submission
app.post('/contact', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can change the service as needed
            auth: {
                user: 'ssbanna836@gmailcom', // Replace with your email
                pass: 'sunilsingh3233', // Replace with your email password or app password
            },
        });

        // Email options
        const mailOptions = {
            from: email, // Sender's email
            to: 'ssbanna836@gmail.com', // Replace with your destination email
            subject: `Contact Form Submission: ${subject}`,
            text: `You have a new message from your website:

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Message: ${message}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send success message to frontend
        res.status(200).json({ success: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





// success print

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.success); // Display success message
        } else {
            alert(result.error); // Display error message
        }
    } catch (error) {
        alert('An unexpected error occurred. Please try again later.');
    }
});
