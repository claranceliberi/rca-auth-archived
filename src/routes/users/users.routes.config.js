"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UsersRoutes = void 0;
var common_routes_config_1 = require("../common/common.routes.config");
var users_controller_1 = require("../../controllers/user/users.controller");
//initiating user controller
var users = new users_controller_1.UsersController();
var UsersRoutes = /** @class */ (function (_super) {
    __extends(UsersRoutes, _super);
    function UsersRoutes(app) {
        return _super.call(this, app, "UsersRoutes") || this;
    }
    UsersRoutes.prototype.configureRoutes = function () {
        //user route
        this.app.route('/users')
            .get(users.all)
            .post(users.create)
            .put(users.udpate);
        //user with id
        this.app.route('/users/:userId')
            .all(function (req, res, next) {
            // this middleware function runs before any request to /users/:userId
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
            .get(users.get)["delete"](users["delete"]);
        return this.app;
    };
    return UsersRoutes;
}(common_routes_config_1.CommonRoutesConfig));
exports.UsersRoutes = UsersRoutes;
