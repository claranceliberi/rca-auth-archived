import {CommonRoutesConfig} from "../common/common.routes.config";
import {Application,Request,Response,NextFunction} from 'express'
import {UsersController} from "../../controllers/user/users.controller";
import {AuthenticateMiddleware} from "../../middlewares/authenticate/authenticate.middleware";

export class UsersRoutes extends CommonRoutesConfig{
    uc: UsersController         //user controller
    am: AuthenticateMiddleware  //authenticated middleware

    constructor(app:Application) {
        super(app,"UsersRoutes");

        this.uc = new UsersController()
        this.am = new AuthenticateMiddleware()
    }

    configureRoutes = (): Application => {

        //user route
        this.app.route('/users')
            .get(this.am.authenticateToken,this.uc.all)
            .post(this.uc.create)
            .put(this.am.authenticateToken,this.uc.update)



        //user with id
        this.app.route('/users/:userId')
            .all(this.am.authenticateToken,(req: Request, res: Response, next: NextFunction) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get(this.uc.get)
            .delete(this.uc.delete);


            return this.app;
    }
}