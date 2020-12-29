import {CommonControllerConfig} from "../common/common.controller.config";
import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'


export class ClientsController extends CommonControllerConfig{
    prisma:PrismaClient

    constructor() {
        super('ClientsController');

        this.prisma = new PrismaClient()
    }

    create = async (req:Request, res:Response) => {
        const {firstName,secondName,email,password} = req.body

        try{
            const result = await this.prisma.client.create({
                data:{
                    firstName,
                    secondName,
                    email,
                    password
                }
            })

            res.json(this.s('success',result))
        }catch (e) {
            res.json(this.s('failed',e,500))
        }
    }
}