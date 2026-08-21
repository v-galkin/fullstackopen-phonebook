const mongoose = require('mongoose')
const MONGDB_URI = require('./config')

const connectToDatabase = () => {
    mongoose.set('strictQuery', false)

    return mongoose
    .connect(MONGDB_URI, { family: 4 })
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message)
    });
};

module.exports = connectToDatabase