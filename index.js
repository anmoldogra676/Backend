const express = require('express')
const db = require('./db')
require('dotenv').config() // just to access the env variables
const app = express()
const passport = require('./auth')
app.use(express.json()) // parses incomming request to js object

const personRouter = require('./Routes/personRoute')
const MenuRouter = require('./Routes/menuRoute')
app.use(passport.initialize()); // this also we have to use for passport so we can use it inside the routes

app.use('/person',personRouter)
app.use('/menu',MenuRouter)
app.get('/',passport.authenticate('local',{session:false}) ,(req,res)=>{
    res.status(200).json({
        msg:"Welcome to home page"
    }) 
})
let port = process.env.PORT ||4000
console.log(port)
app.listen(port)



// client to server communication --> we need endpoint( route), method(get, put, post)