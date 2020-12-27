"use strict";
exports.__esModule = true;
exports.CommonControllerConfig = void 0;
var CommonControllerConfig = /** @class */ (function () {
    function CommonControllerConfig(name) {
        this.name = name;
    }
    CommonControllerConfig.prototype.getName = function () {
        return this.name;
    };
    /**
     * send formatted response
     *
     * @param msg
     * @param data
     * @param status
     */
    CommonControllerConfig.prototype.s = function (msg, data, status) {
        if (status === void 0) { status = 200; }
        return { message: msg, data: data, status: status };
    };
    return CommonControllerConfig;
}());
exports.CommonControllerConfig = CommonControllerConfig;
