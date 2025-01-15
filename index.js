const express = require('express');
const app = express();
app.use(express.json());
const connectDb = require('./database/db')
const PORT= 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
    });

connectDb();
// app.get('/user',(req,res)=> {
//     res.json({name:'Samar'})
// });

const userRouter = require('./router/user-router');
app.use('/user', userRouter);