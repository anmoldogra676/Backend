const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt  = require('bcrypt')
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

personSchema.pre('save', async function(next) { // save krne se phle 
    const person = this;
  
    // Check if the password field is modified
    if (!person.isModified('password')) {
      return next(); // Password not modified, proceed to save
    }
  
    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(person.password, 10);
      person.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });

  personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
      // Compare the candidate password with the hashed password
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw error;
    }
  };

const person = mongoose.model('person',personSchema) // model or schema or collection or table  define
module.exports =person // exports it so that we can use it with along the db object --> which refers to database connection