const {CommonRoutesConfig} = require("../common/common.routes.config");
const {AuthenticationController} = require("../../controllers/authentication/authentication.controller");
const {AuthenticateMiddleware} = require("../../middlewares/authenticate/authenticate.middleware");

const authMiddle = new AuthenticateMiddleware()

class AuthenticationRoutes extends CommonRoutesConfig{
    constructor(app) {
        super(app,"AuthenticationRoutes");
    }

    configureRoutes(){
        const auth = new AuthenticationController()

        this.app.post('/auth/login',auth.login)
        this.app.get('/auth/current',authMiddle.authenticateToken,auth.currentUser)

        return this.app
    }
}

exports.AuthenticationRoutes = AuthenticationRoutes