import {CommonRoutesConfig} from "../common/common.routes.config";
import {Application} from "express";
import {AuthenticationController} from "../../controllers/authentication/authentication.controller";


export class AuthenticationRoutes extends CommonRoutesConfig{
    constructor(app:Application) {
        super(app,"AuthenticationRoutes");
    }

    configureRoutes(): Application {
        const auth = new AuthenticationController()

        this.app.post('/auth/login',auth.login)
        this.app.get('/auth/current',auth.currentUser)

        return this.app
    }
}