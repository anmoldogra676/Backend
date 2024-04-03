const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const person = require('../Model/Person')
const ObjectId = mongoose.Types.ObjectId;

router.post('/',async (req,res)=>{
    const data = req.body;

    try{
        console.log(data)
        const nperson = new person(data) // create a new person document
        const savedData =await nperson.save()
        console.log(savedData)
        res.status(200).json(savedData)
    }catch(err){
        res.status(500).json(err)
    
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