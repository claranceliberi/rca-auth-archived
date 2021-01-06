const {CommonRoutesConfig} = require("../common/common.routes.config");
const {PrivilegesController} = require("../../controllers/privillege/privilege.controller");

const privilege = new PrivilegesController()

class PrivilegesRoutes extends CommonRoutesConfig{


    constructor(app) {
        super(app,'PrivilegeRoutes');
    }

    configureRoutes() {

        //creating apps
        this.app.route('/privileges')
            .all((req,res,next) => {
                next()
            })
            .post(privilege.create)
            .put(privilege.put)
            .get(privilege.all)


        this.app.route('/privileges/id/:id')
            .all((req, res, next) => {
                next()
            })
            .get(privilege.getById)



        this.app.route('/privileges/appId/:appId')
            .get(privilege.getByAppId)

        this.app.route('/privileges/user/:userId')
            .get(privilege.getByUserId)


        return this.app;
    }
}

exports.PrivilegesRoutes = PrivilegesRoutes