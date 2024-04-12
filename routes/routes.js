const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');


// DB connection
const DB = 'placesToStay.db'; //path to the SQLite database file
const db = new Database(DB);
console.log(`Connected to the ${DB} database`);


router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login',(req, res)=>{
    res.render('signup')
})

router.get('/location',(req,res) => {
    try{
        const stmt = db.prepare('SELECT * FROM accommodation');
        const results = stmt.all();
        res.json(results);
    }
    catch (error) {
        //console.log(error);
        res.status(500).json({ error: error });
    }
});

router.get('/location/:name',(req,res) => {
    try{
        const stmt = db.prepare('SELECT * FROM accommodation WHERE location=?');
        const results = stmt.all(req.params.name);
        res.json(results);
    }
    catch (error) {
        //console.log(error);
        res.status(500).json({ error: error });
    }
});

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


router.post('/booking/add',(req,res)=>{    
        try {
            //check if empty input
            if (req.body.id == "" || req.body.npeople == "" || req.body.thedate == "" ) {
                res.status(400).json({ error: "Blank fields" });
            } else {
                const stmt = db.prepare('INSERT into acc_bookings(accID,thedate,npeople) VALUES(?,?,?)'); //statement - SQL query
                const info = stmt.run(req.body.id, req.body.thedate, req.body.npeople); //run the query and store the information about it
                const stmt_upd = db.prepare('UPDATE acc_dates SET availability = availability - 1 WHERE accID=? AND thedate=?');
                const new_info = stmt_upd.run(req.body.id,req.body.thedate)
                
                if (info.changes==1) {
                    res.json({ success: 1 });
                } else {
                    res.status(404).json({error: `No such location ID ${req.params.id}`});
                }
            }
            
        } catch (error) {
            res.status(500).json({ error: error });
            //console.log(error);
            console.log(`POST add title ${req.body.title} by artist ${req.body.artist} error`);
        }
    });


router.get('/accommodation/:name',(req,res) => {
    try{
        const stmt = db.prepare('SELECT accommodation.*, acc_dates.thedate, acc_dates.availability FROM accommodation JOIN acc_dates ON accommodation.ID = acc_dates.accID WHERE accommodation.location=?;');
        const results = stmt.all(req.params.name);
        res.json(results);
    }
    catch (error) {
        //console.log(error);
        res.status(500).json({ error: error });
    }
});    


router.get('/accommodation/:name/type/:type',(req,res) => {
    try{
        const stmt = db.prepare('SELECT accommodation.*, acc_dates.thedate, acc_dates.availability FROM accommodation JOIN acc_dates ON accommodation.ID = acc_dates.accID WHERE accommodation.location=? AND accommodation.type=?;');
        const results = stmt.all(req.params.name,req.params.type);
        res.json(results);
    }
    catch (error) {
        //console.log(error);
        res.status(500).json({ error: error });
    }
});

router.post('/user_login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        if (username == "" || password == "") {
            res.status(400).json({ error: "Blank fields" });
        }else{
        const stmt = db.prepare('SELECT * FROM acc_users WHERE username=? AND password=?');
        const result = stmt.get(username,password);
        res.json(result);
        }
    }catch(error){

    }

  });

module.exports = router;