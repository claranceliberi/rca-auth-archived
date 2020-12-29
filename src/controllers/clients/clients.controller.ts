import {CommonControllerConfig} from "../common/common.controller.config";
import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'


export class ClientsController extends CommonControllerConfig{
    prisma:PrismaClient

    constructor() {
        super('ClientsController');

        this.prisma = new PrismaClient()
    }

}