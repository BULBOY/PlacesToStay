// Import Express module and create a router object for handling routes.
const express = require('express');
const router = express.Router();
// Import the better-sqlite3 module for database interactions.
const Database = require('better-sqlite3');


// Establish a connection to the SQLite database specified by the DB path.
const DB = 'placesToStay.db'; //path to the SQLite database file
const db = new Database(DB);
console.log(`Connected to the ${DB} database`);

// Route to render the home page.
router.get('/',(req,res)=>{
    res.render('index')
})
// Route to render the signup page.
router.get('/login',(req, res)=>{
    res.render('signup')
})

// Route to fetch all accommodations from the database.
router.get('/location',(req,res) => {
    try{
        const stmt = db.prepare('SELECT * FROM accommodation');
        const results = stmt.all(); // Execute query and fetch all results.
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});

// Route to fetch accommodations by location name.
router.get('/location/:name',(req,res) => {
    try{
        const stmt = db.prepare('SELECT * FROM accommodation WHERE location=?');
        const results = stmt.all(req.params.name); // Execute query with provided location name.
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});


// Route to fetch accommodations by location and type.
router.get('/location/:name/type/:type',(req,res)=> {
    try{
        const stmt = db.prepare('SELECT * FROM accommodation  WHERE location=? AND type=?');
        const results = stmt.all(req.params.name,req.params.type);
        res.json(results)
    }
    catch(error){
        res.status(500).json({error: error})
    }
});


//-----------------------------------------------------------------------------------------------------------------------------------------

// Route to add a booking entry.
router.post('/booking/add',(req,res)=>{    
        try {
            //Check if empty input.
            if (req.body.id == "" || req.body.npeople == "" || req.body.thedate == "" ) {
                res.status(400).json({ error: "Blank fields" });// Check for blank input fields.
            } else {
                const stmt = db.prepare('INSERT into acc_bookings(accID,thedate,npeople,username) VALUES(?,?,?,?)'); //statement - SQL query
                const info = stmt.run(req.body.id, req.body.thedate, req.body.npeople, req.body.username); //run the query and store the information about it
                const stmt_upd = db.prepare('UPDATE acc_dates SET availability = availability - 1 WHERE accID=? AND thedate=?');
                const new_info = stmt_upd.run(req.body.id,req.body.thedate)
                
                if (info.changes==1) {
                    res.json({ success: 1 }); // Confirm successful booking.
                } else {
                    res.status(404).json({error: `No such location ID ${req.params.id}`});
                }
            }
            
        } catch (error) {
            res.status(500).json({ error: error });
            console.log(`POST add title ${req.body.title} by artist ${req.body.artist} error`);
        }
    });

// Route to fetch detailed accommodation information.

router.get('/accommodation/:name',(req,res) => {
    try{
        const stmt = db.prepare('SELECT accommodation.*, acc_dates.thedate, acc_dates.availability FROM accommodation JOIN acc_dates ON accommodation.ID = acc_dates.accID WHERE accommodation.location=?;');
        const results = stmt.all(req.params.name);
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});    

// Route to fetch available accommodation by location and type.
router.get('/accommodation/:name/type/:type',(req,res) => {
    try{
        const stmt = db.prepare('SELECT accommodation.*, acc_dates.thedate, acc_dates.availability FROM accommodation JOIN acc_dates ON accommodation.ID = acc_dates.accID WHERE accommodation.location=? AND accommodation.type=? AND acc_dates.availability > 0;');
        const results = stmt.all(req.params.name,req.params.type);
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});

//#################################################################################

// Route to handle user login.
  router.post('/user_login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const stmt = db.prepare('SELECT * FROM acc_users WHERE username=? AND password=?');
        const result = stmt.get(username,password);
        res.json(result);
        console.log(result)
       
        
    }catch(error){
        res.status(500).json({ error: error }); // Handle errors.
    }
  });

module.exports = router;