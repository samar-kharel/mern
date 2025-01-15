const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8';

const connectDb = async () => {
    // try{
        await mongoose.connect(URI);
        console.log('Database connected');
    // }
    // catch(error) {
    //     console.log('Database conncection failed');
    // }
    }
module.exports = connectDb;
