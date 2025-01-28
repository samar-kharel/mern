const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true,
    },
    price: {
        type: Number,
        required:true,
    },
    description:{
        type: String,
        required: true,
    },
    stockquantity:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    colour:{
        type: String,
        required: true,
    },
    picture:{
        type:String,
        required:false,
    }
})

const Product = mongoose.model('Product',productSchema);
module.exports = Product;