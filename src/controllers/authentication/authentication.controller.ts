import {CommonControllerConfig} from "../common/common.controller.config";
import {Request, Response} from "express";
import {IUser, User} from "../../models/user.model";


export class AuthenticationController extends CommonControllerConfig{
    constructor() {
        super("AuthenticationController");
    }

    login(req:Request,res:Response){
        const s = super.s

        let user = User.findOne({email:req.body.email},(err:any,user:IUser|null) => {
            if(err)
                res.send(s('failed',err,500))
            else if(user === null)
                res.send(s('failed',"user not found",404))
            else
                res.send(s('success',user))
        })
    }
}