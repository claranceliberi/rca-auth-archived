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
exports.UsersController = void 0;
var user_model_1 = require("../../models/user.model");
var debug_1 = require("debug");
var common_controller_config_1 = require("../common/common.controller.config");
var UsersController = /** @class */ (function (_super) {
    __extends(UsersController, _super);
    function UsersController() {
        var _this = _super.call(this, 'UserController') || this;
        // initiating debugger
        _this.d = debug_1["default"](_this.getName());
        return _this;
    }
    //get all users
    UsersController.prototype.all = function (req, res) {
        var _this = this;
        var users = user_model_1.User.find(function (err, users) {
            if (err)
                res.send(_this.s('not created', err, 500));
            else
                res.send(_this.s('created', users));
        });
    };
    //create user
    UsersController.prototype.create = function (req, res) {
        var _this = this;
        var createdUser = user_model_1.User.create(req.body, function (err, user) {
            if (err)
                res.send(_this.s('not created', err, 500));
            else
                res.send(_this.s('created', user));
        });
    };
    //get user with id
    UsersController.prototype.get = function (req, res) {
        var _this = this;
        var user = user_model_1.User.findById(req.params.userId, function (err, user) {
            if (err)
                res.send(_this.s('not created', err, 500));
            else
                res.send(_this.s('created', user));
        });
    };
    // update user
    UsersController.prototype.udpate = function (req, res) {
        var _this = this;
        var id = req.body.id; //get id from body
        delete req.body.id; //delete id in body
        user_model_1.User.findByIdAndUpdate(id, req.body, function (err, user) {
            if (err)
                res.send(_this.s('not created', err, 500));
            else
                res.send(_this.s('created', user));
        });
    };
    // delete user
    UsersController.prototype["delete"] = function (req, res) {
        var _this = this;
        user_model_1.User.findByIdAndDelete(req.params.userId, function (err, user) {
            if (err)
                res.send(_this.s('not created', err, 500));
            else
                res.send(_this.s('created', user));
        });
    };
    return UsersController;
}(common_controller_config_1.CommonControllerConfig));
exports.UsersController = UsersController;
