import {CommonRoutesConfig} from "../common/common.routes.config";
import {Application,Request,Response,NextFunction} from 'express'


export class UsersRoutes extends CommonRoutesConfig{
    constructor(app:Application) {
        super(app,"UsersRoutes");
    }

    configureRoutes(): Application {

        //user route
        this.app.route('/users')
            .get((req: Request, res: Response) => {
                res.status(200).send('list of all users')
            })
            .post((req: Request, res: Response) => {
                res.status(200).send("a created user")
            })


        //user with id
        this.app.route('/users/:userId')
            .all((req: Request, res: Response, next: NextFunction) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get((req: Request, res: Response) => {
                res.status(200).send(`GET requested for id ${req.params.userId}`);
            })
            .put((req: Request, res: Response) => {
                res.status(200).send(`PUT requested for id ${req.params.userId}`);
            })
            .patch((req: Request, res: Response) => {
                res.status(200).send(`PATCH requested for id ${req.params.userId}`);
            })
            .delete((req: Request, res: Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.userId}`);
            });

        return this.app;
    }
}