import {CommonRoutesConfig} from "../common/common.routes.config";
import {Application} from 'express'


export class UsersRoutes extends CommonRoutesConfig{
    constructor(app:Application) {
        super(app,"UsersRoutes");
    }
}