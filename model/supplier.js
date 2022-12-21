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
    }
})

var Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier
