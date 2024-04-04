
const passport = require('passport') // authentication 
const LocalStrategy = require('passport-local').Strategy; // strategy for auth we can adf
const person = require('./Model/Person') // person model/collection
passport.use(new LocalStrategy(
    async function(username, password, done) {
     console.log("Doing authentication ")
     let newperson = await person.findOne({ username: username }) // find user which has username 
     
     let isPassMatch = await newperson.comparePassword(password)
     console.log(isPassMatch)
     if(isPassMatch){
         // if pass matches then return
         return done(null ,newperson) // done m error, user, message 
     }else{
         return done(null, false, {"message":"wrong pass"})
     }
    }
   ));
   module.exports= passport