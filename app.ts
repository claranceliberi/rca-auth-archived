import express,{Application,Response,Request} from 'express'
import * as http from 'http'
import * as bodyParser from "body-parser";

import * as winston from "winston";
import * as expressWinston from 'express-winston'
import cors from 'cors'
import debug from "debug";

import {CommonRoutesConfig} from "./src/common/common.routes.config";
import  {UsersRoutes} from "./src/users/users.routes.config";

const app:Application = express();
const server:http.Server = http.createServer(app)
const port: Number = 3000;
const routes: Array<CommonRoutesConfig> = []
const debugLog: debug.IDebugger = debug('app')


//parse all incoming requests as JSON
app.use(bodyParser.json())

// here we are adding middleware to allow cross-origin requests
// app.use(cors());

// here we are configuring the expressWinston logging middleware,
// which will automatically log all HTTP requests handled by Express.js
app.use(expressWinston.logger({
    transports:[new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json())
}))


// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new UsersRoutes(app))

// here we are configuring the expressWinston error-logging middleware,
// which doesn't *handle* errors per se, but does *log* them
app.use(expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json())
}));


// this is a simple route to make sure everything is working properly
app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Server up and running!`)
});


server.listen(port,() =>{
    console.log(`✨ Server has been started on https://localhost:${port}`)
})