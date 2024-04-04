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


// ---> Moongoose helps us to create schema or collection and can tell how our data will look alike 