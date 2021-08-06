import { CommonRoutesConfig } from './common.routes.config';
import { PrivilegesController } from '../controllers/privilege.controller';
import { Express, Request, Response, NextFunction } from 'express';

const privilege = new PrivilegesController();

export class PrivilegesRoutes extends CommonRoutesConfig {
    constructor(app: Express) {
        super(app, 'PrivilegeRoutes');
    }

    configureRoutes(): Express {
        this.app
            .route('/v1/privileges')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .post(privilege.create)
            .put(privilege.put)
            .get(privilege.all);

        this.app.route('/v1/privileges/permit').post(privilege.permit_privilege);

        this.app
            .route('/v1/privileges/id/:id')
            .all((req, res, next) => {
                next();
            })
            .get(privilege.getById);

        this.app.route('/v1/privileges/appId/:appId').get(privilege.getByAppId);

        this.app.route('/v1/privileges/user/:userId').get(privilege.getByUserId);

        return this.app;
    }
}
