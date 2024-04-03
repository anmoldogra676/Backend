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