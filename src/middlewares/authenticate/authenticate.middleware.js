const {CommonMiddlewareConfig} = require("../common/common.middleware.config");
const jwt = require('jsonwebtoken')

class AuthenticateMiddleware extends CommonMiddlewareConfig{

    constructor() {
        super('AuthenticationMiddleware');
    }
    authenticateToken = async (req,res, next)=>{
        //capturing authorization header to get token
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]

        //when does not exists return 401
        if(!token) res.send(this.s('failed','token not found',401))

        else {

            try{
                await jwt.verify(token,process.env["TOKEN_SECRETE"])
                next()

            }catch (e) {
                res.send(this.s('failed',e,500))
            }

        }
    }
}

exports.AuthenticateMiddleware = AuthenticateMiddleware