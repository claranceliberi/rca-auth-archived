const {CommonControllerConfig} = require("../common/common.controller.config")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const debug = require('debug')

const d = debug('AuthController')

class AuthenticationController extends CommonControllerConfig{
    constructor() {
        super("AuthenticationController");

    }


    currentUser = async (req,res) => {

        //capturing authorization header to get token
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]

        //get user email from token
        const userFromToken = await jwt.verify(token ,process.env["TOKEN_SECRETE"])

        //excluding password in returned document
        const user = User.where('email',userFromToken['email']).select('-password')

        user.exec((err,user) => {
            if(err)
                res.send(this.s('failed',err,500))
            else
                res.send(this.s('success',user))

        })


    }

    login = (req,res) =>{
        const s = super.s
        const self = this

        let user = User.findOne({email:req.body.email},(err,user) => {
            if(err)
                res.send(s('failed',err,500))
            else if(user === null)
                res.send(s('failed',"Wrong credentials",401))
            else{
                const truePassword = bcrypt.compareSync(req.body.password,user.password)

                if(truePassword){
                    const jwt = self.generatesAccessToken({email:req.body.email})

                    const response = {
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

    generatesAccessToken = (username,secrete = process.env.TOKEN_SECRETE,expiresIn = '1800s') =>{
        d(secrete)
        return jwt.sign(username,secrete,{expiresIn})
    }
}

exports.AuthenticationController = AuthenticationController