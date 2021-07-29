import  {CommonRoutesConfig} from "./common.routes.config"
import  {UserAuthenticationController} from "../controllers/user.authentication.controller"
import  {AuthenticateMiddleware} from "../middlewares/authenticate.middleware"
import { Express } from "express"

const authMiddle = new AuthenticateMiddleware()

export class UserAuthenticationRoutes extends CommonRoutesConfig{
    constructor(app : Express) {
        super(app,"UserAuthenticationRoutes");
    }

    configureRoutes(){
        const auth = new UserAuthenticationController()

        this.app.post('/v1/userAuth/login',auth.login)
        this.app.get('/v1/userAuth/current',authMiddle.authenticateToken,auth.currentUser)

        return this.app
    }
}
