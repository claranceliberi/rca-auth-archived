const {CommonControllerConfig} = require("../common/common.controller.config")


class AppsController extends CommonControllerConfig{

    constructor() {
        super("AppsController");
    }

}


exports.AppController = AppsController