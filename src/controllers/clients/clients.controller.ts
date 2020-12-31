import {CommonControllerConfig} from "../common/common.controller.config";
import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'


export class ClientsController extends CommonControllerConfig{
    prisma:PrismaClient

    constructor() {
        super('ClientsController');

        this.prisma = new PrismaClient()
    }

    all = async (req:Request, res:Response) => {
            try{
                const clients = await this.prisma.client.findMany()

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
}