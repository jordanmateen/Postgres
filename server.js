const express = require('express');
const app = express();
const PORT = 2340;

app.use((req, res, next)=>{
    console.log(req.path);
    next();
})
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res)=>{
    res.send('Welcome HOME!!!')
})

app.listen(PORT, ()=>{
    console.log('You very cool app is running on port ' + PORT);
})  