const {CommonRoutesConfig} = require("../common/common.routes.config");
const {AppsController} = require("../../controllers/apps/apps.controller");

const app = new AppsController()

class AppsRoutes extends CommonRoutesConfig{


    constructor(app) {
        super(app,'AppsRoutes');
    }

    configureRoutes() {

        //creating apps
        this.app.route('/v1/apps')
            .all((req,res,next) => {
                next()
            })
            .post(app.create)
            .put(app.put)
            .get(app.all)


        this.app.route('/v1/apps/id/:id')
            .all((req, res, next) => {
                next()
            })
            .get(app.getById)



        this.app.route('/v1/apps/appId/:appId')
            .get(app.getByAppId)
            .delete(app.delete)

        this.app.route('/v1/apps/client/:clientId')
            .get(app.getByClient)

        this.app.route('/v1/apps/secretKey/regenerate')
            .post(app.generateNewSecretKey)

        return this.app;
    }
}

exports.AppsRoutes = AppsRoutes