import { CommonRoutesConfig } from './common.routes.config';
import { UsersController } from '../controllers/users.controller';
import { Express } from 'express';

const user = new UsersController();

export class OpenRoutes extends CommonRoutesConfig {
    constructor(app: Express) {
        super(app, 'Openroutes');
    }

    configureRoutes(): Express {
        this.app
            .route('/v1/o/user/info')
            .all((req, res, next) => {
                next();
            })
            .post(user.get_user_by_token);

        return this.app;
    }
}
