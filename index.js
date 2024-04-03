const express = require('express')
const db = require('./db')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
app.use(express.json()) // parses incomming request to js object
const person = require('./Model/Person')
const personRouter = require('./Routes/personRoute')
const MenuRouter = require('./Routes/menuRoute')

passport.use(new LocalStrategy(
   async function(username, passwordd, done) {
    console.log("user redirected to certain route having some params")
   let pp = await person.findOne({ username: username })
    
    let isPassMatch = passwordd=== pp.password
    console.log(passwordd)
    console.log(pp.password)
    console.log(isPassMatch)
    if(isPassMatch){
        return done(null ,pp)
    }else{
        return done(null, null, {"message":"wrong pass"})
    }
   }
  ));

app.use(passport.initialize());

app.use('/person',personRouter)
app.use('/menu',MenuRouter)
app.get('/',passport.authenticate('local',{session:false}) ,(req,res)=>{
    res.status(200).json({
        msg:"Welcome to home page"
    }) 
})
app.listen(3000)



// client to server communication --> we need endpoint( route), method(get, put, post)