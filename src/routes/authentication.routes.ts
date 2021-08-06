import { CommonRoutesConfig } from './common.routes.config';
import { AuthenticationController } from '../controllers/authentication.controller';
import { AuthenticateMiddleware } from '../middlewares/authenticate.middleware';
import { Express } from 'express';

const authMiddle = new AuthenticateMiddleware();

export class AuthenticationRoutes extends CommonRoutesConfig {
    constructor(app: Express) {
        super(app, 'AuthenticationRoutes');
    }

    configureRoutes(): Express {
        const auth = new AuthenticationController();

        this.app.post('/v1/auth/login', auth.login);
        this.app.get('/v1/auth/current', authMiddle.authenticateToken, auth.currentUser);

        return this.app;
    }
}
