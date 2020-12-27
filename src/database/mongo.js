"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var debug_1 = require("debug");
var uri = "mongodb://localhost:27018/rca_auth";
var debugLog = debug_1["default"]('mongodb');
function connectMongo() {
    mongoose_1.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(function (res) {
        debugLog('✔ connected successfully');
    })["catch"](function (err) {
        debugLog('❌ connection was not established');
    });
}
exports["default"] = connectMongo;
