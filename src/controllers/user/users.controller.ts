import {Request,Response} from "express";
import {BackendIUser, IUser, User} from "../../models/user.model";
import {DocumentQuery} from "mongoose";
import debug,{IDebugger} from 'debug'
import {Types} from "mongoose";
import {CommonControllerConfig} from "../common/common.controller.config";





export class UsersController extends CommonControllerConfig{
    // initiating debugger
    d:IDebugger = debug(this.getName())

    constructor() {
        super('UserController');
    }

    //get all users
    all(req:Request,res:Response){
        let users: DocumentQuery<any,any> = User.find((err:any,users:any) =>{
            if(err)
                res.send(this.s('not created',err,500))
            else
                res.send(this.s('created',users))
        } )
    }

    //create user
    create(req:Request,res:Response){

        let createdUser: void = User.create(req.body,(err:any,user:IUser) => {
            if(err)
                res.send(this.s('not created',err,500))
            else
                res.send(this.s('created',user))
        })
    }

    //get user with id
    get(req:Request,res:Response){

        let user:DocumentQuery<any, any> = User.findById(req.params.userId,(err:any,user:IUser|null) => {
            if(err)
                res.send(this.s('not created',err,500))
            else
                res.send(this.s('created',user))
        })
    }

    // update user
    udpate(req:Request,res:Response){

        const id:Types.ObjectId = req.body.id //get id from body
        delete req.body.id //delete id in body
        User.findByIdAndUpdate(id,req.body,(err:any,user:IUser|null) => {
            if(err)
                res.send(this.s('not created',err,500))
            else
                res.send(this.s('created',user))
        })
    }


    // delete user
    delete(req:Request,res:Response){
        User.findByIdAndDelete(req.params.userId,(err:any,user:IUser|null) => {
            if(err)
                res.send(this.s('not created',err,500))
            else
                res.send(this.s('created',user))
        })
    }


}