const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    },
    phone:{
        type: Number,
        required: false,
    },
    email:{
        type: String,
        required: true,
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User;