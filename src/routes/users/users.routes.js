import {CommonRoutesConfig} from "../common/common.routes.config";
import {Application,Request,Response,NextFunction} from 'express'
import {UsersController} from "../../controllers/user/users.controller";
import {AuthenticateMiddleware} from "../../middlewares/authenticate/authenticate.middleware";

//user controller
const  uc: UsersController = new UsersController()

//authenticated middleware
const am: AuthenticateMiddleware  = new AuthenticateMiddleware()

export class UsersRoutes extends CommonRoutesConfig{


    constructor(app:Application) {
        super(app,"UsersRoutes");


    }

    configureRoutes (): Application {

        //user route
        this.app.route('/users')
            .get(am.authenticateToken,uc.all)
            .post(uc.create)
            .put(am.authenticateToken,uc.update)



        //user with id
        this.app.route('/users/:userId')
            .all(am.authenticateToken,(req: Request, res: Response, next: NextFunction) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get(uc.get)
            .delete(uc.delete);


            return this.app;
    }
}