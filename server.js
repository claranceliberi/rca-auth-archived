
import express,{Application,Response,Request} from 'express'
import * as http from 'http'
import * as bodyParser from "body-parser";
import dotenv from    'dotenv'


import cors from 'cors'
import debug from "debug";

import {UsersRoutes} from "./src/routes/users/users.routes";
import {AuthenticationRoutes} from "./src/routes/Authentication/authentication.routes";
import connectMongo from './src/database/mongo'
import {ClientsRoutes} from "./src/routes/clients/clients.routes";


export class Server{
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
        // app.use(cors());


        //configuring dot env
        console.log(__dirname)
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


    startServer = () => {

        this.server.listen(this.port,() =>{
            this.debugLog(`✨ Server has been started on https://localhost:${this.port}`)

            this.routes.forEach((route) => {
                this.debugLog(`Routes configured for "${route.getName()}"`)
            })
        })
    }
}