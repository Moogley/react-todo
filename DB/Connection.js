const mongoose = require('mongoose');
require('dotenv').config()

const URI = process.env.MONGO_URI

const connectDB = async () => {
    await mongoose.connect(URI, { 
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("DB Connected")
}

module.exports = connectDB;
