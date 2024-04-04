// database connection --> moongoose 

const mongoose = require('mongoose')
require('dotenv').config() // configure the dotenv file 
const url= process.env.mongoURL
mongoose.connect(url)
const db =  mongoose.connection
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