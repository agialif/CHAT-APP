const mongoose = require("mongoose")
const Schema = mongoose.Schema

var messageSchema = new Schema({
    message: {
        text: {
            type: String,
            required: true
        }
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{
    timestamps: true
})

var Message = mongoose.model("Message", messageSchema)

module.exports = Message