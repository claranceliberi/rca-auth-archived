const {CommonRoutesConfig} = require("../common/common.routes.config");
const {ClientsController} = require("../../controllers/clients/clients.controller");

const cc = new ClientsController()

class ClientsRoutes extends CommonRoutesConfig{


    constructor(app) {
        super(app,'ClientsController');

    }

    configureRoutes() {

        //creating app
        this.app.route('/clients')
            .all((req,res,next) => {
                next()
            })
            .post(cc.create)
            .get(cc.all)


        this.app.route('/clients/:clientsId')
            .all((req, res, next) => {
                next()
            })
            .get(cc.get)
            .put(cc.put)
            .delete(cc.delete)


        this.app.route('/clients/:email')
            .get(cc.getByEmail)



        return this.app;
    }
}

exports.ClientsRoutes = ClientsRoutes