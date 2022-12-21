var jwt = require("jsonwebtoken")
var bcrypt = require("bcrypt-nodejs")
var User = require("../model/user")

const login  = (async(req, res) => {
    const user = await User.findOne({username: req.body.username})
    if (!user) {
        console.log("Username not found")
        return res.status(400).json({error: "Username not found"})
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
        console.log("Password is wrong")
        return res.status(400).json({error: "Password is wrong"})
    }

    const token = jwt.sign(
        {
            name: user.name,
            id: user._id,
        },
        process.env.TOKEN_SECRET_USER,
        {
            expiresIn: "24h"
        }
    )
    res.cookie("authCookie", token, {maxAge: 9000000, httpOnly: true}).json(
        {
            error: null,
            id: user.id,
            data: {
                token
            }
        }
    )
})

const signUp = (async(req, res) => {
    const userExist = await User.findOne({username: req.body.username})
    if (userExist) {
        console.log("Username already exist")
        return res.status(400).json({error: "Username already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        name: req.body.name,
        password: hashPassword
    })
    try{
        const saveuser = await user.save();
        res.send(saveuser)
    }
    catch (err) {
        res.status(400).send(err)
    }

})


module.exports = {
    signUp,
    login
}