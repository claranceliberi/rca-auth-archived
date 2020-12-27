import express,{Application,Response,Request} from 'express'
import * as http from 'http'
import * as bodyParser from "body-parser";
import {config} from    'dotenv'

import cors from 'cors'
import debug from "debug";

import {CommonRoutesConfig} from "./src/routes/common/common.routes.config";
import {UsersRoutes} from "./src/routes/users/users.routes";
import mongo from './src/database/mongo'
import {AuthenticationRoutes} from "./src/routes/Authentication/authentication.routes";


//initializing mongo connection
mongo()

//configuring dot env
config({path:__dirname+'/.env'})


const app:Application = express();
const server:http.Server = http.createServer(app)
const port: Number = Number(process.env.PORT) || 3000;
const routes: Array<CommonRoutesConfig> = []
const debugLog: debug.IDebugger = debug('app');


//parse all incoming requests as JSON
app.use(bodyParser.json())

// here we are adding middleware to allow cross-origin requests
// app.use(cors());


//adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new UsersRoutes(app))
routes.push(new AuthenticationRoutes(app))



// this is a simple route to make sure everything is working properly
app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Server up and running!`)
});

server.listen(port,() =>{
    debugLog(`✨ Server has been started on https://localhost:${port}`)

    routes.forEach((route:CommonRoutesConfig) => {
        debugLog(`Routes configured for "${route.getName()}"`)
    })
})