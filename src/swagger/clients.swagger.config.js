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
    public async getOneById(@Path() clientId:number){

    }

    /**
     * Get client by email
     */
    @Tags('Clients')
    @Get('{clientId}')
    public async getOneByEmail(@Path() clientId:number){

    }

    /**
     * Update client by id
     */
    @Tags('Clients')
    @Put('{clientId}')
    public async update(@Path() clientId:number){

    }

    /**
     * Delete client by id
     */
    @Tags('Clients')
    @Delete('{clientId}')
    public async delete(@Path() clientId:number){

    }






}