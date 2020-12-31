import {Post, Route,Body,Security, Tags, Get, Path,Put, Delete} from "tsoa";

@Route('clients')
export class ClientsSwaggerConfig{

    /**
     * Get all clients
     */
    @Tags('clients')
    @Get('/')
    public async getAll(){

    }

}