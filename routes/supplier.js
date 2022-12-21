var express = require('express');
var {
  login,
  signUp,
  supplier_list
} = require("../controller/supplier")
var supplierRouter = express.Router();

supplierRouter.route("/login")
.post(login)

supplierRouter.route("/signup")
.post(signUp)

supplierRouter.route("/list")
.get(supplier_list)

module.exports = supplierRouter;
