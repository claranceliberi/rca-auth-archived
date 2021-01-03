import {Request,Response} from "express";
import {BackendIUser, IUser, User} from "../../models/user.model";
import debug,{IDebugger} from 'debug'
import {Types} from "mongoose";
import {CommonControllerConfig} from "../common/common.controller.config";
import Joi,{Schema} from 'joi'
import bcrypt from 'bcryptjs'
import {Route,Get,Tags,Post} from "tsoa"
import {UserSwaggerConfig} from "../../swagger/user.swagger.config";



// initiating debugger
const d:IDebugger = debug("UserController")


export class UsersController extends CommonControllerConfig{
    constructor() {
        super('UserController');

        new UserSwaggerConfig()
    }

    //get all users
    all = (req:Request,res:Response)=>{
        const s = super.s

        let users = User.find((err:any,users:any) =>{
            if(err)
                res.send(s('failed',err,500))
            else if(users === null)
                res.send(s('success',users,404))
            else
                res.send(s('success',users))
        } )
    }

    //create user
    create = async (req:Request,res:Response) =>{
        const s = this.s

        //validator format
        const schema:Schema = Joi.object({
            first_name:Joi.string().required().min(2),
            second_name:Joi.string().required().min(2),
            email:Joi.string().email().required().min(5),
            password:Joi.string().required(),
        })

        const {error} = schema.validate(req.body)

        //checking error
        if(error)
            res.send(s('failed',error.details[0].message,409))

        else {
            //checking if user exists
            let user:IUser|null =await User.findOne({email:req.body.email})

            if(user)
                res.send(s('failed','user already exists with that email',409))
            else {

                const salt = bcrypt.genSaltSync(10)
                req.body.password = bcrypt.hashSync(req.body.password,salt)

                let createdUser: void = User.create(req.body,(err:any,user:IUser) => {


                    if(err)
                        res.send(s('failed',err,500))
                    else
                        res.send(s('success',user))
                })

            }

        }

    }

    //get user with id
    get(req:Request,res:Response){
        const s = super.s

        let user = User.findById(req.params.userId,(err:any,user:IUser|null) => {
            if(err)
                res.send(s('server error',err,500))
            else if(user === null)
                res.send(s('no found',user,404))
            else
                res.send(s('found',user))
        })
    }

    // update user
    update(req:Request,res:Response){
        const s = super.s

        const id:Types.ObjectId = req.body.id //get id from body
        delete req.body.id //delete id in body

        let user = User.findByIdAndUpdate(id,req.body,{new:true},(err:any,user:IUser|null) => {
            if(err)
                res.send(s('not updated',err,500))
            else if(user === null)
                res.send(s('no user found',user,404))
            else
                res.send(s('found',user))
        })
    }


    // delete user
    delete(req:Request,res:Response){
        const s = super.s

        let user = User.findByIdAndDelete(req.params.userId,{},(err:any,user:IUser|null) => {
            if(err)
                res.send(s('not deleted',err,500))
           else if(user === null)
                res.send(s('no user found',user,404))
            else
                res.send(s('deleted',user))
        })
    }


}