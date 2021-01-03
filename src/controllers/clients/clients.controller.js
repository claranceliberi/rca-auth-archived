import {CommonControllerConfig} from "../common/common.controller.config";
import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'
import {ClientsSwaggerConfig} from "../../swagger/clients.swagger.config";


export class ClientsController extends CommonControllerConfig{
    prisma:PrismaClient

    constructor() {
        super('ClientsController');

        this.prisma = new PrismaClient()

        new ClientsSwaggerConfig()
    }

    all = async (req:Request, res:Response) => {
            try{
                    const clients = await this.prisma.client.findMany()
                    await this.prisma.

                res.send(this.s('success',clients))
            }catch (e) {
                res.send(this.s('failed',e,500))
            }
    }

    create = async (req:Request, res:Response) => {
        const {firstName,secondName,email,password} = req.body

        try{
            const userExist = await this.prisma.client.findUnique({where:{email}})


            //check if user exists
            if( userExist !== null && userExist.hasOwnProperty('email'))
                res.send(this.s('failed',"email already exists",500))

            else{
                const result = await this.prisma.client.create({
                    data:{
                        firstName,
                        secondName,
                        email,
                        password
                    }
                })

                res.json(this.s('success',result))
            }

        }catch (e) {
            res.json(this.s('failed',e,500))
        }
    }

    get = async (req:Request, res:Response) => {

        try{

            const client = await this.prisma.client.findUnique({where:{id:+req.params.clientId}})

            res.send(this.s('success',client))

        }catch (e) {
            res.send(this.s('failed',e,500))
        }
    }

    getByEmail = async (req:Request, res:Response) => {

        try {
            const client = await this.prisma.client.findUnique({where:{email:req.params.email}})

            res.send(this.s('success',client))
        }catch (e) {
            res.send(this.s('failed', e, 500))
        }
    }



    put = async (req:Request,res:Response) => {

        try{
            //extract user object
            const {firstName,secondName,email,password} = req.body

            //check if user already exists
             const client = await this.prisma.client.findUnique({where:{id:+req.params.clientId}})

            if(client && client.hasOwnProperty('email')){

               try{
                    //update user
                    const updatedUser = await this.prisma.client.update({where: {id: +req.params.clientId}, data: {firstName, secondName, email, password}})

                    res.send(this.s('success',updatedUser))

               }catch (e){
                    res.send(this.s('failed',e,500))
               }


            }else{
                res.send(this.s('failed','user does not exists'))
            }

        }catch (e) {
            res.send(this.s('failed',e,500))
        }
    }


    delete = async (req:Request, res:Response) => {

        try{
            const deletedUser = await this.prisma.client.delete({where:{id:+req.params.clientId}})

            res.send(this.s('success',deletedUser))
        }catch (e) {
            res.send(this.s('failed',e))
        }
    }
}