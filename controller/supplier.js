var jwt = require("jsonwebtoken")
var bcrypt = require("bcrypt")
var Supplier = require("../model/supplier")
const User = require("../model/user")

const login  = (async(req, res) => {
    const supplier = await Supplier.findOne({name: req.body.name})
    if (!supplier) {
        console.log("Supplier not found")
        return res.status(400).json({error: "Supplier not found"})     
    }

    const validPassword = await bcrypt.compare(req.body.password, supplier.password)

    if (!validPassword) {
        console.log("Password is wrong")
        return res.status(400).json({error: "Password is wrong"})
    }

    const token = jwt.sign(
        {
            name: supplier.name,
            id: supplier._id,
        },
        process.env.TOKEN_SECRET_USER,
        {
            expiresIn: "24h"
        }
    )
    res.cookie("authCookie", token, {maxAge: 9000000, httpOnly: true}).json(
        {
            error: null,
            id: supplier.id,
            data: {
                token
            }
        }
    )
})

const signUp = (async(req, res) => {
    const supplierExist = await Supplier.findOne({name: req.body.name})
    if (supplierExist) {
        console.log("Supplier already exist")
        return res.status(400).json({error: "Supplier already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const supplier = new Supplier({
        name: req.body.name,
        address: req.body.address,
        password: hashPassword
    })
    try{
        const savesupplier = await supplier.save();
        res.send(savesupplier)
    }
    catch (err) {
        res.status(400).send(err)
    }

})

const supplier_list = (async(req, res) => {
    Supplier.find()
    .then((supplier) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(supplier);
    })
}) 

module.exports = {
    signUp,
    login,
    supplier_list
}