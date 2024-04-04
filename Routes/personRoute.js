const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const person = require('../Model/Person')
 const {generateToken,jwtmiddleware}= require('../jwt')

router.post('/signup',async (req,res)=>{
    const data = req.body;

    try{
        // console.log(data)
        const nperson = new person(data) // create a new person document
        const savedData =await nperson.save()
        // generate a token
        const payload ={
            id:savedData.id,
            username:savedData.username
        }
        const token = generateToken(payload)
        res.status(200).json({
            savedData: savedData,token:token})
    }catch(err){
        res.status(500).json(err)
    
    }
})

router.post('/signin',async(req, res)=>{
    const {username,password} = req.body;
    try {
        const findUser = await person.findOne({username:username});
        if(!findUser)res.send("invalid user please sign up ")
        const passMatch = findUser.comparePassword(password)
        if(!passMatch)res.send("invalid pass for signin")
        const payload ={
          id:findUser.id,
          username:findUser.username  
        }
        const token = generateToken(payload)
        res.status(200).send(token)

    }catch(err){
     res.status(404).send("error in the signin Route")
    }

})

router.get('/profile',jwtmiddleware,async(req,res)=>{
    try{
        // console.log(req.id)
        console.log(req.user)
        let idd = req.user.id
        let userId = await person.findById(idd)
        // console.log(userId)

        res.send(userId)
    }catch(err){
        res.send("error in profile route")
    }
})


router.get('/',async(req,res)=>{
    try{
        console.log('inside person route')
      const personData = await person.find()
       res.send(personData)
    }catch(err){

    }
})

// multiple endpoint hain
router.get('/:type',async(req,res)=>{
    let personType= req.params.type;
    console.log(personType)
    if(personType=='chef'|| personType=='manager'|| personType=='worker'){
        try{
            let listOFPerson = await person.find({work:personType})
            console.log(listOFPerson)
            res.status(200).send(listOFPerson)

        }catch(err){
            res.status(400).send("error in checking person type");
        }

    }else{
        res.status(400).send("error in checking person type");
    }
})

router.put('/:id',async(req,res)=>{
    try{
        let uniqueId = req.params.id
    let updatedData = req.body;
    if (!ObjectId.isValid(uniqueId)) {
        return res.status(400).send('Invalid ID format');
    }

    let response = await person.findByIdAndUpdate(uniqueId,updatedData,{
        new:true, // return updated document, 
        // runValidators:true // check if validator
    })
    if(!response){
        res.status(404).send("error in finding the person")
    }
    
    res.status(200).send(response)

    }catch(err){
console.log(err)
    }
    
})

module.exports =router