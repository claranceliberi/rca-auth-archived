import {CommonMiddlewareConfig} from "./common.middleware.config"
import jwt, {Secret} from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'

export class AuthenticateMiddleware extends CommonMiddlewareConfig{

    constructor() {
        super('AuthenticationMiddleware');
    }
    authenticateToken = async (req : Request,res: Response, next : NextFunction)=>{
        //capturing authorization header to get token
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]

        //when does not exists return 401
        if(!token) res.send(this.s('failed','token not found',401))

        else {

            try{
                await jwt.verify(token,process.env["TOKEN_SECRETE"] as Secret)
                next()

            }catch (e) {
                res.send(this.s('failed',e,500))
            }

        }
    }
}
