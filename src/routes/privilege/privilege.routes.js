const {CommonRoutesConfig} = require("../common/common.routes.config");
const {PrivilegesController} = require("../../controllers/privillege/privilege.controller");

const privilege = new PrivilegesController()

class PrivilegesRoutes extends CommonRoutesConfig{


    constructor(app) {
        super(app,'PrivilegeRoutes');
    }

    configureRoutes() {

        
        this.app.route('/v1/privileges')
            .all((req,res,next) => {
                next()
            })
            .post(privilege.create)
            .put(privilege.put)
            .get(privilege.all)

        
        this.app.route('/v1/privileges/permit')
            .post(privilege.permit_privilege)

        this.app.route('/v1/privileges/id/:id')
            .all((req, res, next) => {
                next()
            })
            .get(privilege.getById)



        this.app.route('/v1/privileges/appId/:appId')
            .get(privilege.getByAppId)

        this.app.route('/v1/privileges/user/:userId')
            .get(privilege.getByUserId)


        return this.app;
    }
}

exports.PrivilegesRoutes = PrivilegesRoutes