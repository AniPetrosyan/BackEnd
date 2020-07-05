const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        max: 100,
        min: 2,
        required: true
    },
    email: {
        type: String,
        max: 100,
        min: 10,
        required: true
    },
    password: {
        type: String,
        max: 1000,
        min: 6,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('User', userSchema)