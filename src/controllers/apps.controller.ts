import { CommonControllerConfig } from './common.controller.config';
import { AuthenticationController } from './authentication.controller';
import models from '../database/postgresSql/models/index';
import Joi from 'joi';
import crypto from 'crypto';
import { Response, Request } from 'express';

const App = models.App;
export class AppsController extends CommonControllerConfig {
    constructor() {
        super('AppsController');
    }

    //get all apps
    all = async (_req: Request, res: Response): Promise<void> => {
        try {
            const apps = await App.findAll();
            res.send(this.s('success', apps));
        } catch (e) {
            res.send(this.s('failed', e, 500));
        }
    };

    //create client
    create = async (req: Request, res: Response): Promise<void> => {
        const { name, redirectUrl } = req.body;

        try {
            //validator format
            const schema = Joi.object({
                name: Joi.string().required().min(2),
                redirectUrl: Joi.string().uri().required().min(2),
            });

            const { error } = schema.validate(req.body);

            //checking error
            if (error) res.send(this.s('failed', error.details[0].message, 409));
            else {
                const randomNumber = Math.floor(Math.random() * Date.now());

                //make sure that e get different number at the highest level
                const appId = Date.now() + randomNumber;

                //secretKey
                const secretKey = crypto.randomBytes(35).toString('hex');

                const { id: clientId } = AuthenticationController.userFromToken(req);

                const result = await App.create({
                    name,
                    clientId,
                    redirectUrl,
                    appId,
                    secretKey,
                });
                res.json(this.s('success', result));
            }
        } catch (e) {
            res.json(this.s('failed', e, 500));
        }
    };

    //get app by id
    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const app = await App.findOne({ where: { id: req.params.id } });

            res.send(this.s('success', app));
        } catch (e) {
            res.send(this.s('failed', e, 500));
        }
    };

    //get app by app id
    getByAppId = async (req: Request, res: Response): Promise<void> => {
        try {
            const app = await App.findOne({ where: { appId: req.params.appId } });

            res.send(this.s('success', app));
        } catch (e) {
            res.send(this.s('failed', e, 500));
        }
    };

    //get client by creator based on his id
    getByClient = async (req: Request, res: Response): Promise<void> => {
        try {
            const apps = await App.findAll({ where: { clientId: req.params.clientId } });

            res.send(this.s('success', apps));
        } catch (e) {
            res.send(this.s('failed', e, 500));
        }
    };

    // update app
    generateNewSecretKey = async (req: Request, res: Response): Promise<void> => {
        try {
            //extract user object
            const { appId } = req.body;

            //validator format
            const schema = Joi.object({
                appId: Joi.string().required().min(10),
            });

            const { error } = schema.validate(req.body);

            //checking error
            if (error) res.send(this.s('failed', error.details[0].message, 409));
            else {
                //check if app exists
                const app = await App.findOne({ where: { appId }, plain: true });

                if (app) {
                    try {
                        //secretKey
                        const secretKey = crypto.randomBytes(35).toString('hex');

                        //update app
                        const updatedApp = await App.update({ secretKey }, { where: { appId }, returning: true });

                        res.send(this.s('success', updatedApp[1]));
                    } catch (e) {
                        res.send(this.s('failed', e, 500));
                    }
                } else {
                    res.send(this.s('failed', 'app does not exists'));
                }
            }
        } catch (e) {
            res.send(this.s('failed', e, 500));
        }
    };

    // update app
    put = async (req: Request, res: Response): Promise<void> => {
        try {
            //extract user object
            const { name, redirectUrl, appId } = req.body;

            //validator format
            const schema = Joi.object({
                appId: Joi.string().required().min(10),
                name: Joi.string().required().min(2),
                redirectUrl: Joi.string().uri().required().min(2),
            });

            const { error } = schema.validate(req.body);

            //checking error
            if (error) res.send(this.s('failed', error.details[0].message, 409));
            else {
                //check if app exists
                const app = await App.findOne({ where: { appId }, plain: true });

                if (app) {
                    try {
                        //update app
                        const updatedApp = await App.update(
                            { name, redirectUrl },
                            { where: { appId }, returning: true },
                        );

                        res.send(this.s('success', updatedApp[1]));
                    } catch (e) {
                        res.send(this.s('failed', e, 500));
                    }
                } else {
                    res.send(this.s('failed', 'app does not exists'));
                }
            }
        } catch (e) {
            res.send(this.s('failed', e, 500));
        }
    };

    //delete client
    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const deletedApp = await App.destroy({ where: { appId: req.params.appId } });

            if (deletedApp === 1) res.send(this.s('success', 'app deleted'));
            else res.send(this.s('failed', 'app does not exists, may be already deleted' + ' or was not created', 409));
        } catch (e) {
            res.send(this.s('failed', e));
        }
    };
}
