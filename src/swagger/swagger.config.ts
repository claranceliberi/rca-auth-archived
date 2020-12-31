import {Application} from "express";
import swaggerUi from 'swagger-ui-express'
import {SwaggerOptions} from "swagger-ui-express";


export class SwaggerConfig{
    app:Application

    constructor(app:Application) {
        this.app = app
    }

    initiateSwagger= () => {
        this.app.use("/docs",
          swaggerUi.serve,
          swaggerUi.setup(undefined, {
            swaggerOptions: {
              url: "/swagger.json",
            },
          })
);
    }
}