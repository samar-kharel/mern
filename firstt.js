const express = require('express');
const app = express();
const BACKEND_PORT = 3000;
app.listen(BACKEND_PORT);
app.get('/user',(req,res)=> {
        // res.json({name:'Samar'})
        res.send('HELLO WORLD')
});

const userRouter = require('./router/user-router');
app.use('/user', userRouter);