import mongoose, {Document, Model} from 'mongoose'

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
    required:true,
},
})

const User : Model<Document> = mongoose.model('User',userSchema)

export default User