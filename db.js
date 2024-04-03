// database connection --> moongoose 
const mongoose = require('mongoose')
const url= 'mongodb+srv://anmoldogra676:anmoldogra676@restaurant.cowypf0.mongodb.net/'
mongoose.connect(url)
const db = mongoose.connection
db.on('connected',()=>{
    console.log('connected to database')
})

db.on('error',()=>{
    console.log('error in connecting to database')
})
db.on('disconnected',()=>{
    console.log('error in connecting to database')
})

module.exports =db;