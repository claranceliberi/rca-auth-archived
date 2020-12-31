import {Post, Route,Body,Security, Tags, Get, Path,Put, Delete} from "tsoa";

interface Client{
    firstName:string,
    secondName:string,
    email:string,
    password:string
}

@Route('clients')
export class ClientsSwaggerConfig{

    /**
     * Get all clients
     */
    @Tags('Clients')
    @Get('/')
    public async getAll(){

    }

    /**
     * Create new client
     */
    @Tags('Clients')
    @Post('/')
    public async create(@Body() data:Client){

    }

    /**
     * Get client by id
     */
    @Tags('Clients')
    @Get('{clientId}')
    public async getOne(@Path() clientId:number){

    }
}