"use strict";
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    first_name: { type: String, required: true },
    second_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
var User = mongoose_1.model('User', userSchema);
exports.User = User;
