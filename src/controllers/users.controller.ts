import debug from 'debug';
import { CommonControllerConfig } from './common.controller.config';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import models from '../database/postgresSql/models/index';
import { PrivilegesController } from './privilege.controller';
import { CallbackError } from 'mongoose';

import User, { UserDoc } from '../models/user.model';
import { Request, Response } from 'express';
const App = models.App;

// initiating debugger
const _d = debug('UserController');

export class UsersController extends CommonControllerConfig {
    constructor() {
        super('UserController');
    }

    //get all users
    all = async (req: Request, res: Response): Promise<void> => {
        const s = super.s;

        await User.find((err: CallbackError, users: UserDoc[]) => {
            if (err) res.send(s('failed', err, 500));
            else if (users === null) res.send(s('success', users, 404));
            else res.send(s('success', users));
        });
    };

    //create user
    create = async (req: Request, res: Response): Promise<void> => {
        const s = this.s;

        //validator format
        const schema = Joi.object({
            first_name: Joi.string().required().min(2),
            second_name: Joi.string().required().min(2),
            email: Joi.string().email().required().min(5),
            password: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        //checking error
        if (error) res.send(s('failed', error.details[0].message, 409));
        else {
            //checking if user exists
            const user = await User.findOne({ email: req.body.email });

            if (user) res.send(s('failed', 'user already exists with that email', 409));
            else {
                const salt = bcrypt.genSaltSync(10);
                req.body.password = bcrypt.hashSync(req.body.password, salt);

                const createdUser = User.create(req.body, (err: CallbackError, user: UserDoc) => {
                    if (err) res.send(s('failed', err, 500));
                    else res.send(s('success', user));
                });
            }
        }
    };

    //get user with id
    get = async (req: Request, res: Response): Promise<void> => {
        const s = super.s;

        await User.findById(req.params.userId, (err: CallbackError, user: UserDoc) => {
            if (err) res.send(s('server error', err, 500));
            else if (user === null) res.send(s('no found', user, 404));
            else res.send(s('found', user));
        });
    };

    // update user
    update = async (req: Request, res: Response): Promise<void> => {
        const s = super.s;

        const id = req.body.id; //get id from body
        delete req.body.id; //delete id in body

        await User.findByIdAndUpdate(id, req.body, { new: true }, (err: CallbackError, user: UserDoc | null) => {
            if (err) res.send(s('not updated', err, 500));
            else if (user === null) res.send(s('no user found', user, 404));
            else res.send(s('found', user));
        });
    };

    // delete user
    delete = async (req: Request, res: Response): Promise<void> => {
        const s = super.s;

        await User.findByIdAndDelete(req.params.userId, {}, (err: CallbackError, user: UserDoc | null) => {
            if (err) res.send(s('not deleted', err, 500));
            else if (user === null) res.send(s('no user found', user, 404));
            else res.send(s('deleted', user));
        });
    };

    //get user by token
    get_user_by_token = async (req: Request, res: Response): Promise<void> => {
        const { userToken, secretKey, appId } = req.body;

        try {
            const app = await App.findOne({ where: { appId } });

            //if app exists
            if (app) {
                //if the secreteKey is correct
                if (app.secretKey === secretKey) {
                    const privilegesInstance = new PrivilegesController();
                    const decryptedToken = privilegesInstance.decrypt_privilege_token(userToken);
                    const permissions: string[] = decryptedToken.split(',');
                    const permissionsObject: Record<string, string> = {};

                    //converting array to object
                    permissions.forEach((val) => {
                        const valArray = val.split(':');
                        permissionsObject[valArray[0]] = valArray[1];
                    });

                    //verify if the asking app is already in the token
                    if (+appId === +permissionsObject.aid) {
                        const user = await User.findById(permissionsObject.uid).select(['-password', '-_id', '-__v']);

                        res.send(this.s('success', user));
                    } else {
                        res.send(this.s('failed', 'invalid token', 401));
                    }
                } else {
                    res.send(this.s('failed', 'not authorized', 401));
                }
            } else {
                res.send(this.s('failed', 'not authorized', 401));
            }
        } catch (err) {
            res.send(this.s('failed', { err }, 500));
        }
    };
}
