import {Post, Route, Tags, Get} from "tsoa";


interface User{
    _id?:string
    first_name:string,
    second_name:string,
    email:string,
    password:string,
    __v?:number,
}

@Route("users")
export class UserSwaggerConfig{
        userObject:User = {
            __v:0,
            _id:"",
            first_name:"",
            second_name:"",
            email:"",
            password:""
    }

    @Tags('users')
    @Get('/')
    public async getAllUsers():Promise<User>{
            return this.userObject
    }

    @Tags('users')
    @Post('/')
    public async createUser():Promise<User>{
            return this.userObject
    }
}