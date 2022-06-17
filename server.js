const express = require('express');

// database integration setup
const pgPromise = require('pg-promise');
const pgp = pgPromise();
const config ={
    host: 'localhost',
    port: 5432,
    database: 'db_class_lecture'
}
const db = pgp(config)

const app = express();
// PORT
const PORT = 2340;


// Middleware
app.use((req, res, next) => {
    console.log(req.path);
    next();
})
app.use(express.json());
app.use(express.urlencoded());

/**
 * Routing
 * GET -> /getAllEngineers: Returns all engineers from collection
 * GET -> /getEngineer/:id:  Returns only one engineer at a given id
 * POST -> /insert: Inserts and engineer into the collection
 * PUT -> /update/:id: Updates an engineers info at a given id 
 */

app.get('/getAllEngineers', (req, res)=>{
    db.any(`SELECT * FROM engineers`) .then(data => {
        res.send(data)
    })
})

app.get('/getEngineer/:id', (req, res)=>{
    const { id } = req.params;
    db.any(`SELECT * FROM engineers WHERE id = $1`, [id]) .then(data => {
        res.send(data);
    })
})

app.post('/insert', (req, res)=>{
    const {user_name, email} = req.body;
    db.none(`INSERT INTO engineers (name, email)  VALUES($1, $2)`, [user_name, email]);
    res.send({msg: 'success', ok: true, body: req.body});
})

app.put('/update/:id', (req, res)=>{
    const {user_name, email} = req.body;
    const { id } = req.params;
    db.none(`UPDATE engineers SET name = $1, email = $2 WHERE id = $3`,[user_name, email, id])
    res.send({msg: 'success', ok: true, body: req.body, id});
})

app.listen(PORT, ()=>{
    console.log('You very cool app is running on port ' + PORT);
})  
