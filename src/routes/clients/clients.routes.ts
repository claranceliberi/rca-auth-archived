import {CommonRoutesConfig} from "../common/common.routes.config";
import {Application} from "express";
import {ClientsController} from "../../controllers/clients/clients.controller";


export class ClientsRoutes extends CommonRoutesConfig{
    cc:ClientsController        //clients controller

    constructor(app:Application) {
        super(app,'ClientsController');

        this.cc = new ClientsController()
    }

    configureRoutes = (): Application => {

        //creating app
        this.app.route('/clients')
            .post(this.cc.create)

        return this.app;
    }
}