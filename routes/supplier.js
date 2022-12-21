var express = require('express');
var {
  login,
  signUp
} = require("../controller/supplier")
var supplierRouter = express.Router();

supplierRouter.route("/login")
.post(login)

supplierRouter.route("/signup")
.post(signUp)

module.exports = supplierRouter;
