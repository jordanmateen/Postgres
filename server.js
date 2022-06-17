const express = require('express');

// database integration setup
const dbLib = require('./db');

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
    dbLib.getAll('engineers') .then(data => {
        res.send(data)
    })
})

app.get('/getEngineer/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const engineer = await dbLib.getOneById(`engineers`, id)
        if(engineer.length){
            res.send(engineer)
        }else{
            throw new Error()
        }
    } catch (error) {
        res.send({msg: 'Data not in collection', id})
    }
})

app.post('/insertEngineer', async (req, res) => {
    const {user_name, email} = req.body;
    try {
        await dbLib.insertOneEngineer('engineers', [user_name, email])
        if(user_name && email){
            res.send({msg: 'success', ok: true, data: req.body});
        }else{
            throw new Error()
        }
    } catch (error) {
        res.send({msg: 'Data not inserted', data: req.body});
    }
})

app.put('/update/:id', (req, res) => {
    const {user_name, email} = req.body;
    const { id } = req.params;
    try {
        dbLib.updateEngineerById(`engineers`,[user_name, email, id])
        if(user_name && email){
            res.send({msg: 'success', ok: true, body: req.body, id}); 
        }else{
            throw new Error()
        }
    } catch (error) {
        res.send({msg: 'Data not updated', data: req.body});
        
    }
})

app.listen(PORT, ()=>{
    console.log('You very cool app is running on port ' + PORT);
})  
