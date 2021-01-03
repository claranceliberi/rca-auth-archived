import {CommonMiddlewareConfig} from "../common/common.middleware.config";
import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken'

export class AuthenticateMiddleware extends CommonMiddlewareConfig{

    constructor() {
        super('AuthenticationMiddleware');
    }
    authenticateToken = async (req:Request,res:Response, next:NextFunction)=>{
        //capturing authorization header to get token
        const authHeader:string|undefined = req.header('Authorization')
        const token:string|null|undefined = authHeader && authHeader.split(' ')[1]

        //when does not exists return 401
        if(!token) res.send(this.s('failed','token not found',401))

        else {

            try{
                await jwt.verify(token,process.env["TOKEN_SECRETE"] as string)
                next()

            }catch (e) {
                res.send(this.s('failed',e,500))
            }

        }
    }
}