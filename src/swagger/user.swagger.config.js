import {Post, Route,Body,Security, Tags, Get, Path,Put, Delete} from "tsoa";


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

    /**
     * Get all user
     */
    @Tags('Users')
    @Security('BearerAuth')
    @Get('/')
    public async getAllUsers(){
    }

    /**
     * Create users
     * @param data
     */
    @Tags('Users')
    @Security('BearerAuth')
    @Post('/')
    public async createUser(@Body() data:User){
    }

    /**
     * Get user based on Id
     */
    @Tags('Users')
    @Security('BearerAuth')
    @Get('{userId}')
    public async getUser(@Path() userId:string){
    }


    /**
     * Update user based on Id
     */
    @Tags('Users')
    @Security('BearerAuth')
    @Put('{userId}')
    public async updateUser(@Path() userId:string){
    }


    /**
     * Delete user based on Id
     */
    @Tags('Users')
    @Security('BearerAuth')
    @Delete('{userId}')
    public async deleteUser(@Path() userId:string){
    }

}