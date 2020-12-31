import {Post, Route, Tags, Get, Example, Body, BodyProp, Query, Security} from "tsoa";

interface Authentication{
    email:string,
    password:string,
}

@Route("auth")
export class AuthenticationSwaggerConfig{
    result:Authentication = {
        email:"",
        password:""
    }

    @Tags('Auth')
    @Post('/login')
    @Example<Authentication>({
            email:"liberintwari@gmail.com",
            password:"liberi2324"
    })
    public async login(@Body() credentials:Authentication):Promise<Authentication>{
        console.log(credentials)
        return this.result
    }

    @Tags('Auth')
    @Security('BearerAuth')
    @Get('/current')
    public async currentUser():Promise<Authentication>{
            return this.result
    }
}