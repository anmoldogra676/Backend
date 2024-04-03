const mongoose = require('mongoose')
let {Schema}= mongoose
let menuSchema = new Schema({
    name:{
        type:String,
    },
    price:Number,
    category:String,
    isDrink:{
        type:'String',
        default:false,
    },
    numOfSales:Number
})
let menu = mongoose.model('menu',menuSchema)
module.exports = menu