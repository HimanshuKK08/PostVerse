const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Postbook");

const userSchema = mongoose.Schema({
    username : String,
    email: String,
    age: Number,
    password: String,
    url: String,
    post: [{
        type: mongoose.Schema.Types.ObjectId
    }]
})

module.exports = mongoose.model('User', userSchema);