// const express = require('express');
// const router = express.Router();
// const Database = require('better-sqlite3');


// // DB connection
// const DB = 'placesToStay.db'; //path to the SQLite database file
// const db = new Database(DB);
// console.log(`Connected to the ${DB} database`);


// router.get('/login',(req, res)=>{
//     res.render('signup')
// })


// // router.post('/authenticate', (req, res) => {
// //     try{
        
// //         const username = req.body.uname;
// //         const password = req.body.password;
        
// //         const stmt = db.prepare('SELECT acc_users.username, acc_users.password FROM acc_users WHERE acc_users.username=?')
// //         const results = stmt.all(username);
// //         res.json(results);

// //         // Simulate user validation (replace with your database interaction)
// //         //if (username===results.uname && password===results.password) {
            
// //         if(results > 0) {

// //            // }

// //         req.session.isLoggedIn = true; // Mark user as logged in
// //         res.send('Login successful');
// //         } else {
// //         res.status(401).send('Invalid credentials');
// //         }
// //     }
// //     catch (error) {

// //     }    
// //   });

// router.post('/authenticate', (req, res) => {
//     try {
//         const username = req.body.uname;
//         const password = req.body.password;

//         const stmt = db.prepare('SELECT * FROM acc_users WHERE acc_users.username=?');

//        // const stmt = db.prepare('SELECT acc_users.username, acc_users.password FROM acc_users WHERE acc_users.username=?');
//         stmt.get(username, (err, user) => { // Use stmt.get for single row retrieval
//             if (err) {
//                 console.error(err); // Log the error for debugging
//                 return res.status(500).send('Internal Server Error'); // Inform user about a general error
//             }

//             if (!user) { // User not found in the database
//                 return res.status(401).send('Invalid credentials');
//             }

//             // Validate password using a secure hashing mechanism (e.g., bcrypt)
//             // Replace the following with your password hashing logic:
//             if (password === user.password ) {
//                 req.session.isLoggedIn = true;
//                 res.send('Login successful');
//             } else {
//                 res.status(401).send('Invalid credentials');
//             }
//         });
//     } catch (error) {
//         console.error(err); // Log the error for debugging
//         res.status(500).send('Internal Server Error');
//     }
// });


// module.exports = router;