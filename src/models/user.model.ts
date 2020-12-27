import {model, Schema, Model, Document,Types} from "mongoose";
import exp from "constants";

interface IUser extends Document{
    first_name:string,
    second_name:string,
    email:string,
    password:string
}

interface BackendIUser extends IUser{
    __v:number,
    _id:Types.ObjectId
}

const userSchema: Schema = new Schema({
    first_name:{type:String,required:true},
    second_name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
})

const User: Model<IUser> = model('User',userSchema)

export {
    User,
    BackendIUser,
    IUser
}