const mongoose = require('mongoose');
const userModel = require('./userModel');

const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel
    },
    date: {
        type: Date,
        default: Date.now,
    },
    title: String,
    content: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        default: 0
    }]
})

module.exports = mongoose.model('post', postSchema);