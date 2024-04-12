const express = require('express');
const Database = require('better-sqlite3');
const session = require('express-session')


// CONFIG SETTINGS
const PORT = 3000;
//const DB = 'placesToStay.db'; //path to the SQLite database file

const app = express();
app.use(express.json()); // necessary to read JSON data from the request body (POST requests)
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))


app.use(session({
    secret: 'placestostay key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true for https
  }));

// Access static content in 'public' folder (html, images, etc...)]
app.use(express.static('public'));

const projectRoute = require('../PlacesToStay/routes/routes');
app.use('/', projectRoute);

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}/`));