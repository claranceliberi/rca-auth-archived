import { Express } from 'express';

export class CommonRoutesConfig {
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

    // configureRoutes() {}
}
