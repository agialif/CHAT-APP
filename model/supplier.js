const mongoose = require("mongoose")
const Schema = mongoose.Schema

var supplierSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true  
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        default: 1
    }
})

var Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier
