"use strict";
exports.__esModule = true;
var express_1 = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var dotenv_1 = require("dotenv");
var debug_1 = require("debug");
var users_routes_config_1 = require("./src/routes/users/users.routes.config");
var mongo_1 = require("./src/database/mongo");
//initializing mongo connection
mongo_1["default"]();
//configuring dot env
dotenv_1.config({ path: __dirname + '/.env' });
var app = express_1["default"]();
var server = http.createServer(app);
var port = Number(process.env.PORT) || 5000;
var routes = [];
var debugLog = debug_1["default"]('app');
//parse all incoming requests as JSON
app.use(bodyParser.json());
// here we are adding middleware to allow cross-origin requests
// app.use(cors());
//adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new users_routes_config_1.UsersRoutes(app));
// this is a simple route to make sure everything is working properly
app.get('/', function (req, res) {
    res.status(200).send("Server up and running!");
});
server.listen(port, function () {
    debugLog("\u2728 Server has been started on https://localhost:" + port);
    routes.forEach(function (route) {
        debugLog("Routes configured for \"" + route.getName() + "\"");
    });
});
