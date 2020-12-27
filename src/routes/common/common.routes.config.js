"use strict";
exports.__esModule = true;
exports.CommonRoutesConfig = void 0;
var CommonRoutesConfig = /** @class */ (function () {
    function CommonRoutesConfig(app, name) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    CommonRoutesConfig.prototype.getName = function () {
        return this.name;
    };
    return CommonRoutesConfig;
}());
exports.CommonRoutesConfig = CommonRoutesConfig;
