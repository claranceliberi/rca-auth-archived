const {CommonControllerConfig} = require("../common/common.controller.config")
const models = require('../../database/postgresSql/models/index')


const App = models.App
class AppsController extends CommonControllerConfig{

    constructor() {
        super("AppsController");
    }



    //get all apps
    all = async (req, res) => {
            try{
                const apps= await App.findAll() ;
                res.send(this.s('success',apps))

            }catch (e) {
                res.send(this.s('failed',e,500))
            }
    }

}


exports.AppController = AppsController