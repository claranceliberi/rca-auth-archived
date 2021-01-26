const {CommonRoutesConfig} = require("../common/common.routes.config");
const {UserController} = require("../../controllers/user/users.controller");

const user = new UsersController()

class OpenRoutes extends CommonRoutesConfig{


    constructor(app) {
        super(app,'Openroutes');
    }

    configureRoutes() {


        this.app.route('/v1/o/user/info')
            .all((req,res,next) => {
                next()
            })
            .post(user.get_user_by_token)


        return this.app;
    }
}

exports.OpenRoutes = OpenRoutes