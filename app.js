// Import required modules: express for server operations, better-sqlite3 for database interactions, and express-session for session management.
const express = require('express');
const Database = require('better-sqlite3');
const session = require('express-session')


// CONFIG SETTINGS

// Server configuration settings
const PORT = 3000; // Port number on which the server will listen.

// Initialize the Express application.
const app = express();
app.use(express.json()); // Middleware to parse JSON data from incoming requests. This is necessary for handling POST requests where the body of the request contains JSON data.
// Set 'ejs' as the view engine for rendering dynamic HTML pages. EJS is a templating language.
app.set('view engine','ejs');
// Middleware to parse URL-encoded data with the querystring library (when extended is false).
app.use(express.urlencoded({extended:true}))

// Configure session management middleware with express-session. This sets up session handling for user logins and other session data.
app.use(session({
    secret: 'placestostay key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true for https
  }));

// Access static content in 'public' folder (html, images, etc...)]
app.use(express.static('public'));

// Import routes from the routes file located in a different directory, using them with the Express app.
const projectRoute = require('../PlacesToStay/routes/routes');
app.use('/', projectRoute);

// Start the server and listen on the specified port, logging a message once the server is running and ready to accept requests.
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}/`));