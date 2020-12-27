import {CommonControllerConfig} from "../common/common.controller.config";
import {Request, Response} from "express";
import {IUser, User} from "../../models/user.model";
import bcrypt from 'bcryptjs'

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
                res.send(s('failed',"Wrong credentials",401))
            else{
                const truePassword:boolean = bcrypt.compareSync(req.body.password,user.password)

                if(truePassword){
                    res.send(s('success','thanks to login'))
                } else {
                    res.send(s('failed',"Wrong credentials",401))
                }

            }
        })
    }
}