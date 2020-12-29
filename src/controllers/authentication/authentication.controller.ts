import {CommonControllerConfig} from "../common/common.controller.config";
import {Request, Response} from "express";
import {IUser, User} from "../../models/user.model";
import bcrypt from 'bcryptjs'
import jwt,{Secret} from 'jsonwebtoken'
import debug,{IDebugger} from 'debug'
import {Query} from "mongoose";

const d:IDebugger = debug('AuthController')

export class AuthenticationController extends CommonControllerConfig{
    constructor() {
        super("AuthenticationController");
    }


    currentUser = async (req:Request,res:Response) => {

        //capturing authorization header to get token
        const authHeader:string|undefined = req.header('Authorization')
        const token:string|null|undefined = authHeader && authHeader.split(' ')[1]

        //get user email from token
        const userFromToken:any = await jwt.verify(token as string,process.env["TOKEN_SECRETE"] as string)

        //excluding password in returned document
        const user:Query<IUser, IUser, IUser>= User.where('email',userFromToken['email']).select('-password')

        user.exec((err:any,user:IUser) => {
            if(err)
                res.send(this.s('failed',err,500))
            else
                res.send(this.s('success',user))

        })


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