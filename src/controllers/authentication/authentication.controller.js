const {CommonControllerConfig} = require("../common/common.controller.config")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const models = require('../../database/postgresSql/models/index')
const debug = require('debug')

const d = debug('AuthController')


const Client = models.Client
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

        try{
            const user = await Client.findOne({
                where:{email:userFromToken['email']},
                attributes:{exclude:['password']}
            })

            res.send(this.s('success',user))

        }catch (e) {
            res.send(this.s('failed',e,500))
        }



    }

    login = async (req,res) =>{
        const s = super.s
        const self = this

        let user = await Client.findOne({where:{email:req.body.email}})

            try{
                if(user === null) //when use was not found
                    res.send(s('failed',"Wrong credentials",401))
                else{
                    const truePassword = bcrypt.compareSync(req.body.password,user.password)

                    if(truePassword){ //when password was right
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
        }catch(e) {
            res.send(s('failed',e,500))
        }
    }

    generatesAccessToken = (username,secrete = process.env.TOKEN_SECRETE,expiresIn = '1800s') =>{
        d(secrete)
        return jwt.sign(username,secrete,{expiresIn})
    }
}

exports.AuthenticationController = AuthenticationController