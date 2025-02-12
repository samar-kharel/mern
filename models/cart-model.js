const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    user_id: {
        type:String,
        required:true,
    }
});
const Cart = mongoose.model('Cart',cartSchema)
module.exports = Cart;