const express = require('express');
const Product = require('./models/product-model');
const app = express();
app.use(express.json());
app.use("/uploads",express.static("uploads"))
const connectDb = require('./database/db')
const PORT= 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
    });

connectDb();
// app.get('/user',(req,res)=> {
//     res.json({name:'Samar'})
// });

//set the view engine to hbs
app.set('view engine','hbs');

app.get('/',async (req,res) => {
    allProducts = await Product.find().select('name price description stockquantity category colour picture')
    const data = {
        products: allProducts
        }
    res.render('index',data);
});


const userRouter = require('./router/user-router');
const productRouter = require('./router/product-Router');
app.use('/user', userRouter);
app.use('/product',productRouter);