import  {CommonControllerConfig} from "../common/common.controller.config"
import  {AuthenticationController} from '../authentication/authentication.controller'
import  bcrypt from 'bcryptjs'
import  jwt, { Secret } from 'jsonwebtoken'
import  debug from 'debug'
import  User from '../../models/user.model'
import  models from '../../database/postgresSql/models/index'
import { Response, Request } from "express"
import { UserInToken } from "../../types/controller.types"

const d = debug('UserAuthenticationController')

const App = models.App

export class UserAuthenticationController extends CommonControllerConfig {
    /**
     * Controller that manage user management request
     */
    constructor() {
        super("UserAuthenticationController");

    }


    //get current user in based on the token
    currentUser = async (req : Request,res : Response) => {

        //get user
        const {email} = await AuthenticationController.userFromToken(req)


        try {
            //excluding password in returned document\
            const userQuery = User.findOne({email})

            userQuery.select('-password')

            const user = await userQuery.exec()

            res.send(this.s('success',user))

        }catch (e) {
            res.send(this.s('failed',e,500))
        }



    }

    //authenticate user
    login = async (req : Request,res : Response) => {
        const s = super.s
        const self = this

        const user = await User.findOne({email:req.body.email})


            try {
                if(!user) //when use was not found
                    res.send(s('failed',"Wrong credentials",401))
                else{
                    const truePassword =
                        bcrypt.compareSync(req.body.password,user.password)

                    if(truePassword) { //when password is right
                        const jwt =
                            self.generatesAccessToken({
                                email:user.email,
                                id:user.id,
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

    /**
     * Generating JWT token
     *
     * @param username => users username
     * @param secrete : secrete key
     * @param expiresIn : token expiration time
     *
     * @returns {*}
     */
    generatesAccessToken = (username : UserInToken,
                            secrete = process.env.TOKEN_SECRETE,
                            expiresIn = '1800s'
    ) =>{
        d(secrete)
        return jwt.sign(username,secrete as Secret,{expiresIn})
    }

    authorizeApp = async (req : Request,res : Response) => {
        const {viewProfile,appId} = req.body
        const {email,id} = AuthenticationController.userFromToken(req)

        try{

            const app = await App.findOne({where:{appId}})

            if(!app) {

            } else
                res.send(
                    this.s('failed',"app does not exists",409)
                )

        }catch (e) {
            res.send(this.s('failed',e,500))
        }
    }


}
