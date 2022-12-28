var express = require('express');
var {
  login,
  signUp,
  user_list
} = require("../controller/user")
var userRouter = express.Router();

userRouter.route("/login")
.post(login)

userRouter.route("/signup")
.post(signUp)

userRouter.route("/list")
.get(user_list)

module.exports = userRouter;
