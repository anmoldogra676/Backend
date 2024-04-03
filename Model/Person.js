const mongoose = require('mongoose')
const {Schema} = mongoose
let personSchema = new Schema({
      name:String,
      age:Number,
      work:{
        type:String,
        enum:['chef','worker','manager'],
      },
      username:{type: String, required:true },
      password:{type: String, required:true },
})
const person = mongoose.model('person',personSchema) // model or schema or collection or table  define
module.exports =person // exports it so that we can use it with along the db object --> which refers to database connection