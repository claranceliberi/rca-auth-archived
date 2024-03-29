import express, {Express} from 'express'
import http from 'http'
import bodyParser from "body-parser"
import dotenv from 'dotenv'
import cors from 'cors'
import debug, {Debugger} from "debug"

import connectMongo from './src/database/mongo'
import {UsersRoutes} from "./src/routes/users.routes"
import {AuthenticationRoutes} from "./src/routes/authentication.routes"
import {ClientsRoutes} from "./src/routes/clients.routes"
import {AppsRoutes} from "./src/routes/app.routes"
import {PrivilegesRoutes} from "./src/routes/privilege.routes"
import {UserAuthenticationRoutes} from "./src/routes/user.authentication.routes"
import {OpenRoutes} from "./src/routes/open.routes"
import { CommonRoutesConfig } from './src/routes/common.routes.config'

export class Server {
    app : Express = express();
    server = http.createServer(this.app)
    port : number = Number(process.env.PORT) || 3000;
    routes : CommonRoutesConfig[] = []
    debugLog : Debugger = debug('app');


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
        this.routes.push(new AppsRoutes(this.app))
        this.routes.push(new PrivilegesRoutes(this.app))
        this.routes.push(new UserAuthenticationRoutes(this.app))
        this.routes.push(new OpenRoutes(this.app))

    }

    initiateMainServerRoute = () => {
        // this is a simple route to make sure everything is working properly
        this.app.get('/', (req, res) => {
            res.status(200).send(`Server made up and running!`)
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

