import {CommonRoutesConfig} from "../common/common.routes.config";
import {Application} from "express";
import {ClientsController} from "../../controllers/clients/clients.controller";

const     cc:ClientsController = new ClientsController()

export class ClientsRoutes extends CommonRoutesConfig{


    constructor(app:Application) {
        super(app,'ClientsController');

    }

    configureRoutes(): Application {

        //creating app
        this.app.route('/clients')
            .post(cc.create)
            .get(cc.all)


        this.app.route('clients/{clientsId}')
            .get(cc.get)
            .put(cc.put)
            .delete(cc.delete)



        return this.app;
    }
}