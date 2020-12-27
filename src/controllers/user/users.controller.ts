import {Request,Response} from "express";
import {BackendIUser, IUser, User} from "../../models/user.model";
import debug,{IDebugger} from 'debug'
import {Types} from "mongoose";
import {CommonControllerConfig} from "../common/common.controller.config";
import Joi,{Schema} from 'joi'
import bcrypt from 'bcryptjs'



// initiating debugger
const d:IDebugger = debug("UserController")


export class UsersController extends CommonControllerConfig{

    constructor() {
        super('UserController');
    }

    //get all users
    all(req:Request,res:Response){
        const s = super.s

        let users = User.find((err:any,users:any) =>{
            if(err)
                res.send(s('not found',err,500))
            else if(users === null)
                res.send(s('no users',users,404))
            else
                res.send(s('found',users))
        } )
    }

    //create user
    create(req:Request,res:Response){
        const s = super.s

        //validator format
        const schema:Schema = Joi.object({
            first_name:Joi.string().required().min(2),
            second_name:Joi.string().required().min(2),
            email:Joi.string().email().required().min(5),
            password:Joi.string().required(),
        })

        const {error} = schema.validate(req.body)

        if(error)
            res.send(s('not created',error.details[0].message,500))

        else {
            const salt = bcrypt.genSaltSync(10)
            req.body.password = bcrypt.hashSync(req.body.password,salt)

            let createdUser: void = User.create(req.body,(err:any,user:IUser) => {


                if(err)
                    res.send(s('not created',err,500))
                else
                    res.send(s('created',user))
            })

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