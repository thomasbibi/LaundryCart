const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user :  {
        type : mongoose.Types.ObjectId,
        ref : "users"
    },
    orderDetails : {
        type : Array,
        default : []
    },
    dateTime : {
        type : String,
        required : true
    },
    totalItems : {
        type : String,
        required : true
    },
    store : {
        type : String
    },
    price : {
        type : String
    },
    status : String,
    city : String,
    phone : String
})

module.exports = mongoose.model('orders',orderSchema)