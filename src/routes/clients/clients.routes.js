import {CommonRoutesConfig} from "../common/common.routes.config";
import {Application, NextFunction, Request, Response} from "express";
import {ClientsController} from "../../controllers/clients/clients.controller";

const     cc:ClientsController = new ClientsController()

export class ClientsRoutes extends CommonRoutesConfig{


    constructor(app:Application) {
        super(app,'ClientsController');

    }

    configureRoutes(): Application {

        //creating app
        this.app.route('/clients')
            .all((req:Request,res:Response,next:NextFunction) => {
                next()
            })
            .post(cc.create)
            .get(cc.all)


        this.app.route('clients/{clientsId}')
            .all((req:Request, res:Response, next:NextFunction) => {
                next()
            })
            .get(cc.get)
            .put(cc.put)
            .delete(cc.delete)


        this.app.route('clients/{email}')
            .get(cc.getByEmail)



        return this.app;
    }
}