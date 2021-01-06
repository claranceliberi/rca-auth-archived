const {CommonControllerConfig} = require("../common/common.controller.config")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/user.model')
const debug = require('debug')
const {AuthenticationController} = require('../authentication/authentication.controller')

const d = debug('UserAuthenticationController')


class UserAuthenticationController extends CommonControllerConfig{
    constructor() {
        super("UserAuthenticationController");

    }


    currentUser = async (req,res) => {

        //get user
        const {email} = await AuthenticationController.userFromToken(req)


        try{
            //excluding password in returned document\
            const userQuery = User.findOne({email})

            userQuery.select('-password')

            const user = await userQuery.exec()

            res.send(this.s('success',user))

        }catch (e) {
            res.send(this.s('failed',e,500))
        }



    }

    login = async (req,res) =>{
        const s = super.s
        const self = this

        let user = await User.findOne({email:req.body.email})


            try{
                if(!user) //when use was not found
                    res.send(s('failed',"Wrong credentials",401))
                else{
                    const truePassword = bcrypt.compareSync(req.body.password,user.password)

                    if(truePassword){ //when password is right
                        const jwt = self.generatesAccessToken({email:user.email,id:user.id})

                        const response = {
                            email:req.body.email,
                            token:jwt
                        }

                        res.send(s('success',response))
                    } else {
                        res.send(s('failed',"Wrong credentials",401))
                    }

                }
        }catch(e) {
            res.send(s('failed',e,500))
        }
    }

    generatesAccessToken = (username,secrete = process.env.TOKEN_SECRETE,expiresIn = '1800s') =>{
        d(secrete)
        return jwt.sign(username,secrete,{expiresIn})
    }

     static userFromToken = (req)=>{
                //capturing authorization header to get token
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]

        //get user email from token
        return jwt.verify(token, process.env["TOKEN_SECRETE"]);
    }
}

exports.UserAuthenticationController = UserAuthenticationController