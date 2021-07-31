import { Express } from 'express';

export abstract class CommonRoutesConfig {
    app: Express;
    name: string;

    constructor(app: Express, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }

    getName(): string {
        return this.name;
    }

    abstract configureRoutes(): Express;
}
