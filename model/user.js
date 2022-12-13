const mongoose = require("mongoose")
const Schema = mongoose.Schema

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

var User = mongoose.model('User', userSchema)

module.exports = User
