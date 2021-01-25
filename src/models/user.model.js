const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
first_name: {
  type: String,
  required: true,
},
second_name: {
  type: String,
  required: true,
},
email:{
    type:String,
    required:true,
},
password:{
  type:String,
    required:true
}
})

module.exports = mongoose.model('User',userSchema)