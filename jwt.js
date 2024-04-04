const jwt = require('jsonwebtoken')
require('dotenv').config() // configure the dotenv file 
const jwtmiddleware = (req,res,next)=>{
    if(!req.headers.authorization){
      res.send("add the token in header")
    }
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token)
    if(!token)res.send({"msg":"Invalid token"})
    try{
    // veridy 
    const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = decoded
    next()

     }catch(err){
        res.send({"msg":"Invalid user not have access"})
     }
}

const generateToken=(userData)=>{
   return jwt.sign({userData},process.env.JWT_SECRET_KEY)
}
 
module.exports= {
    jwtmiddleware,generateToken }