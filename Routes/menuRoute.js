const express = require('express')
const router = express.Router();
const person = require('../Model/Menu')


router.get('/',async(req,res)=>{
    let body = req.body;
    let response = await person.find()
    res.status(200).send(response)
 })
 
 router.post('/',async (req,res)=>{
     let body = req.body;
     let menuDocument  = new menu(body);
     let obj= await menuDocument.save()
     res.send(obj)
 })

 module.exports =router

 //--> express router there can be many router for different endpoint handling like menu, restaurnant , person so 
 // for better management everyone should have their own router and from the main server file you should call your 
 // specific router 
 /*
 Like here ---> router --> express.Router()
 router.get()
 router.post()
 export router at end 


 in the main file use middleware --> middleware is nothing but series of function call happens between req, res cycle 
 app.use('/person',personRouter)
 
 
 */