import {Post, Route, Tags, Get, Example, Body, Security} from "tsoa";

interface Authentication{
    email:string,
    password:string,
}

const result:Authentication = {
    email:"liberintwari@gmail.com",
    password:"liberi2324"
}

@Route("auth")
export class AuthenticationSwaggerConfig{


    /**
     * Authenticate to the system
     * @param credentials
     */
    @Tags('Auth')
    @Post('/login')
    @Example<Authentication>(result)
    public async login(@Body() credentials:Authentication):Promise<Authentication>{
        console.log(credentials)
        return result
    }


    /**
     * Retrieves the information of the current logged in user
     */
    @Tags('Auth')
    @Security('BearerAuth')
    @Get('/current')
    public async currentUser(){

    }
}