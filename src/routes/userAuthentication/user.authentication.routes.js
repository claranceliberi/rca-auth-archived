const {CommonRoutesConfig} = require("../common/common.routes.config");
const {UserAuthenticationController} = require("../../controllers/userAuthentication/user.authentication.controller");
const {AuthenticateMiddleware} = require("../../middlewares/authenticate/authenticate.middleware");

const authMiddle = new AuthenticateMiddleware()

class UserAuthenticationRoutes extends CommonRoutesConfig{
    constructor(app) {
        super(app,"UserAuthenticationRoutes");
    }

    configureRoutes(){
        const auth = new UserAuthenticationController()

        this.app.post('/v1/userAuth/login',auth.login)
        this.app.get('/v1/userAuth/current',authMiddle.authenticateToken,auth.currentUser)

        return this.app
    }
}

exports.UserAuthenticationRoutes = UserAuthenticationRoutes