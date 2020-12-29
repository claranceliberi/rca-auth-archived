import {CommonControllerConfig} from "../common/common.controller.config";
import {Request, Response} from "express";
import {IUser, User} from "../../models/user.model";
import bcrypt from 'bcryptjs'
import jwt,{Secret} from 'jsonwebtoken'
import debug,{IDebugger} from 'debug'

const d:IDebugger = debug('AuthController')

export class AuthenticationController extends CommonControllerConfig{
    constructor() {
        super("AuthenticationController");
    }

    login = (req:Request,res:Response) =>{
        const s = super.s
        const self = this

        let user = User.findOne({email:req.body.email},(err:any,user:IUser|null) => {
            if(err)
                res.send(s('failed',err,500))
            else if(user === null)
                res.send(s('failed',"Wrong credentials",401))
            else{
                const truePassword:boolean = bcrypt.compareSync(req.body.password,user.password)

                if(truePassword){
                    const jwt:string = self.generatesAccessToken({email:req.body.email})

                    const response:object = {
                        email:req.body.email,
                        token:jwt
                    }

                    res.send(s('success',response))
                } else {
                    res.send(s('failed',"Wrong credentials",401))
                }

            }
        })
    }

    generatesAccessToken = (username:string|object,secrete:string|undefined = process.env.TOKEN_SECRETE,expiresIn:string = '1800s'): string =>{
        d(secrete)
        return jwt.sign(username,<Secret>secrete,{expiresIn:expiresIn})
    }
}