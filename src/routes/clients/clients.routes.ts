import  {CommonRoutesConfig} from "../common/common.routes.config"
import  {ClientsController} from "../../controllers/clients/clients.controller"
import { Express } from "express";

const cc = new ClientsController()

export class ClientsRoutes extends CommonRoutesConfig{


    constructor(app : Express) {
        super(app,'ClientsRoutes');

    }

    configureRoutes() {

        //creating apps
        this.app.route('/v1/clients')
            .all((req,res,next) => {
                next()
            })
            .post(cc.create)
            .get(cc.all)


        this.app.route('/v1/clients/id/:clientId')
            .all((req, res, next) => {
                next()
            })
            .get(cc.getById)
            .put(cc.put)
            .delete(cc.delete)


        this.app.route('/v1/clients/email/:email')
            .get(cc.getByEmail)



        return this.app;
    }
}

