var express = require('express');
var {
  login,
  signUp
} = require("../controller/user")
var userRouter = express.Router();

userRouter.route("/login")
.post(login)

userRouter.route("/signup")
.post(signUp)

module.exports = userRouter;
