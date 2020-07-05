const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },

    username: {
        type: String,
        max: 200,
        min: 2,
        required: true,
        
    },
    category: {
        type: String,
        max: 100,
        min: 2,
        required: true
    },
    
    imgUrl: {
        type: String,
        max: 200,
        min: 2,
        required: true
    },

    describtion: {
        type: String,
        max: 300,
        min: 2,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },

    
})


module.exports = mongoose.model('Post', postSchema)