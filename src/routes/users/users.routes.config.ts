import {CommonRoutesConfig} from "../common/common.routes.config";
import {Application,Request,Response,NextFunction} from 'express'
import {UsersController} from "../../controllers/user/users.controller";

//initiating user controller
const users = new UsersController()

export class UsersRoutes extends CommonRoutesConfig{
    constructor(app:Application) {
        super(app,"UsersRoutes");
    }

    configureRoutes(): Application {

        //user route
        this.app.route('/users')
            .get(users.all)
            .post(users.create)
            .put(users.udpate)



        //user with id
        this.app.route('/users/:userId')
            .all((req: Request, res: Response, next: NextFunction) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get(users.get)
            .delete(users.delete);


            return this.app;
    }
}