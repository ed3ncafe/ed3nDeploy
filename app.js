// Import necessary modules
const express = require('express'); // For creating web server
const bodyParser = require('body-parser'); // For parsing incoming request bodies for my forms
const nodemailer = require('nodemailer'); // For sending emails through my forms
const morgan = require('morgan'); // For logging HTTP requests and to see errors in terminal

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000; // Define port number, default is 3000

// Serve static files (like HTML, CSS, images)
app.use(express.static('public'));
app.set('view engine', 'ejs'); // Set the view engine to EJS for rendering dynamic content
app.use(express.static('views')); // Serve static files from the views directory
app.use(express.static('style')); // Serve static files from the style directory
app.use(express.static('images')); // Serve static files from the images directory

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aidanhughes88@gmail.com', // Your Gmail username if you want to test functionality of the form
        pass: 'miuh rswt pesj xbra' // Your Gmail password if you want to test functionality of the form
    }
});

// Define routes 

// Home page
app.get('/', (req, res) => {
    res.render('home'); // Render the home page using the home.ejs page
});

// Menu page
app.get('/menu', (req, res) => {
    res.render('menu'); // Render the menu page using the menu.ejs page
});

// Booking page
app.get('/booking', (req, res) => {
    res.render('booking'); // Render the booking page using the booking.ejs page
});

// Confirmation page
app.get('/confirmation', (req, res) => {
    res.render('confirmation'); // Render the confirmation page using the confirmation.ejs page
});

// form submission for booking
app.post('/submit', (req, res) => {
    const { name, email, date, time, Guest, comments } = req.body;

    // Do something with the form data (e.g., save to a database)

    // Set up email options
    const mailOptions = {
        from: 'aidanhughes88@gmail.com', 
        to: 'aidanhughes88@gmail.com', 
        subject: 'New Booking',
        text: `Name: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}\nGuests: ${Guest}\nComments: ${comments}`,
        replyTo: email
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error); // Prints error in terminal
            res.send('Error occurred while sending the email.');
        } else {
            console.log('Email sent: ' + info.response); //Prints statement that the email was sent
            res.redirect('/confirmation'); // Redirect to confirmation page after successful submission
        }
    });
});

// Catering page
app.get('/catering', (req, res) => {
    res.render('catering'); // Render the catering page using the catering.ejs page
}); 

// Handle form submission for catering
app.post('/submit1', (req, res) => {
    const { name, email, comments } = req.body;

    // Do something with the form data (e.g., save to a database)

    // Set up email options
    const mailOptions = {
        from: 'aidanhughes88@gmail.com', 
        to: 'aidanhughes88@gmail.com', 
        subject: 'New Booking',
        text: `Name: ${name}\nEmail: ${email}\nComments: ${comments}`,
        replyTo: email 
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Error occurred while sending the email.');
        } else {
            console.log('Email sent: ' + info.response); //Prints statement that the email was sent
            res.redirect('/confirmation'); // Redirect to confirmation page after successful submission
        }
    });
});

// Venue page
app.get('/venue', (req, res) => {
    res.render('venue'); // Render the venue page using the venue.ejs template
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Log HTTP requests in the terminal
app.use(morgan('dev'));
