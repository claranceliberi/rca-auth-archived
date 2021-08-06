import { Express, Request, Response, NextFunction } from 'express';

import { CommonRoutesConfig } from './common.routes.config';
import { UsersController } from '../controllers/users.controller';
import { AuthenticateMiddleware } from '../middlewares/authenticate.middleware';

//user controller
const uc = new UsersController();

//authenticated middleware
const am = new AuthenticateMiddleware();

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: Express) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): Express {
        //user route
        this.app
            .route('/v1/users')
            .get(am.authenticateToken, uc.all)
            .post(uc.create)
            .put(am.authenticateToken, uc.update);
        //thats what i always say

        //user with id
        this.app
            .route('/v1/users/:userId')
            .all(am.authenticateToken, (req: Request, res: Response, next: NextFunction) => {
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
