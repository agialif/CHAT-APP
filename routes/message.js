var express = require('express');
var {
    addMessage,
    getMessage
} = require("../controller/messages")
var messageRouter = express.Router()

messageRouter.route("/addmessage")
.post(addMessage)

messageRouter.route("/getmessage")
.post(getMessage)

module.exports = messageRouter