import {Application} from 'express'

export class CommonRoutesConfig{
    app:Application;
    name:string;


    constructor(app:Application,name:string) {
        this.app = app
        this.name = name
    }

    getName(){
        return this.name
    }
}