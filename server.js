
const express = require('express')
const http = require('http')
const bodyParser = require("body-parser");
const dotenv = require('dotenv')
const cors = require('cors')
const debug = require("debug");

const {UsersRoutes} =  require("./src/routes/users/users.routes");
const {AuthenticationRoutes} =  require("./src/routes/Authentication/authentication.routes");
const connectMongo =  require('./src/database/mongo')
const {ClientsRoutes} =  require("./src/routes/clients/clients.routes");



class Server{
    app = express();
    server = http.createServer(this.app)
    port = Number(process.env.PORT) || 3000;
    routes = []
    debugLog = debug('app');

    constructor() {
        this.connectMongo()

        this.initiateConfigs()

        this.initiateRoutes()

        this.initiateMainServerRoute()


    }

    connectMongo = () => {
        // initialize mongo connection
        connectMongo()
    }


    initiateConfigs = () => {
        //parse all incoming requests as JSON
        this.app.use(bodyParser.json())

        //serve static dir
        this.app.use(express.static("public"))

        // here we are adding middleware to allow cross-origin requests
        this.app.use(cors());

        //configuring dot env
        dotenv.config({path:__dirname + "/.env"})
    }


    initiateRoutes = () => {
        //adding the UserRoutes to our array,
        // after sending the Express.js application object to have the routes added to our app!
        this.routes.push(new UsersRoutes(this.app))
        this.routes.push(new AuthenticationRoutes(this.app))
        this.routes.push(new ClientsRoutes(this.app))
    }

    initiateMainServerRoute = () => {
        // this is a simple route to make sure everything is working properly
        this.app.get('/', (req, res) => {
            res.status(200).send(`Server up and running!`)
        });
    }


    startSever = () => {

        this.server.listen(this.port,() =>{
            this.debugLog(`✨ Server has been started on https://localhost:${this.port}`)

            this.routes.forEach((route) => {
                this.debugLog(`Routes configured for "${route.getName()}"`)
            })
        })
    }
}


exports.Server = Server