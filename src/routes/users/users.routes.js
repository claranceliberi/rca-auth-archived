const {CommonRoutesConfig} = require("../common/common.routes.config");
const {UsersController} = require("../../controllers/user/users.controller");
const {AuthenticateMiddleware} = require("../../middlewares/authenticate/authenticate.middleware");

//user controller
const uc = new UsersController()

//authenticated middleware
const am = new AuthenticateMiddleware()

class UsersRoutes extends CommonRoutesConfig {


    constructor(app) {
        super(app,"UsersRoutes");


    }

    configureRoutes () {

        //user route
        this.app.route('/v1/users')
            .get(am.authenticateToken,uc.all)
            .post(uc.create)
            .put(am.authenticateToken,uc.update)



        //user with id
        this.app.route('/v1/users/:userId')
            .all(am.authenticateToken,(req, res, next) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get(uc.get)
            .delete(uc.delete);


            return this.app;
    }
}

exports.UsersRoutes = UsersRoutes