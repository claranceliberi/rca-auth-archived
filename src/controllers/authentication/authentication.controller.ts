import {CommonControllerConfig} from "../common/common.controller.config"
import bcrypt from 'bcryptjs'
import jwt, { Secret } from 'jsonwebtoken'
import models from '../../database/postgresSql/models/index'
import debug from 'debug'
import { Request, Response } from "express"
import { UserInToken } from "../../types/controller.types"

const d = debug('AuthenticationController')


const Client = models.Client

export class AuthenticationController extends CommonControllerConfig {
    constructor() {
        super("AuthenticationController");

    }


    // get current user
    currentUser = async (req : Request,res : Response) => {

        //get user
        const {email} = await AuthenticationController.userFromToken(req)


        try {
            //excluding password in returned document\

            const user = await Client.findOne({
                where:{email},
                attributes:{exclude:['password']},
            })

            res.send(this.s('success',user))

        }catch (e) {
            res.send(this.s('failed',e,500))
        }



    }

    //authenticate user
    login = async (req : Request,res : Response) => {
        const s = super.s
        const self = this

        const user = await Client.findOne({where:{email:req.body.email}})


        try {
            if(user === null) //when use was not found
                res.send(s('failed',"Wrong credentials",401))
            else {
                const truePassword =
                    bcrypt.compareSync(req.body.password,user.password)

                if(truePassword){ //when password was right
                    const jwt = self.generatesAccessToken({
                        email:user.email, id:user.id
                    })

                    const response = {
                        email:req.body.email,
                        token:jwt,
                    }

                    res.send(s('success',response))
                } else {
                    res.send(
                        s('failed',"Wrong credentials",401)
                    )
                }

            }
        }catch(e) {
            res.send(s('failed',e,500))
        }
    }

    generatesAccessToken = (
        username : string | UserInToken ,secrete = process.env.TOKEN_SECRETE,
        expiresIn = '1800s'
    ) => {
        d(secrete)
        return jwt.sign(username,secrete as Secret,{expiresIn})
    }

    //get user from token
     static userFromToken = (req : Request) : UserInToken=> {
                //capturing authorization header to get token
        const authHeader = req.header('Authorization')
        const token : string | undefined = authHeader && authHeader.split(' ')[1]

        //get user email from token
        return jwt.verify(token as string, process.env["TOKEN_SECRETE"] as Secret) as UserInToken;
    }
}
