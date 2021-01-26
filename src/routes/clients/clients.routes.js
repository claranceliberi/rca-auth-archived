const {CommonRoutesConfig} = require("../common/common.routes.config");
const {ClientsController} = require("../../controllers/clients/clients.controller");

const cc = new ClientsController()

class ClientsRoutes extends CommonRoutesConfig{


    constructor(app) {
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

exports.ClientsRoutes = ClientsRoutes