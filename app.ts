import express,{Application,Response,Request} from 'express'
import * as http from 'http'
import * as bodyParser from "body-parser";


import cors from 'cors'
import {_errorLogger, console_logger, file_logger} from "./logger";
import debug from "debug";

import {CommonRoutesConfig} from "./src/routes/common/common.routes.config";
import {UsersRoutes} from "./src/routes/users/users.routes.config";

const app:Application = express();
const server:http.Server = http.createServer(app)
const port: Number = Number(process.env.PORT) || 5000;
const routes: Array<CommonRoutesConfig> = []
const debugLog: debug.IDebugger = debug('app');


//parse all incoming requests as JSON
app.use(bodyParser.json())

// here we are adding middleware to allow cross-origin requests
// app.use(cors());

// here we are configuring the expressWinston logging middleware,
// which will automatically log all HTTP requests handled by Express.js
app.use(file_logger)
app.use(console_logger)


//adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new UsersRoutes(app))

//configuring the expressWinston error-logging middleware,
// which doesn't *handle* errors per se, but does *log* them
app.use(_errorLogger);


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