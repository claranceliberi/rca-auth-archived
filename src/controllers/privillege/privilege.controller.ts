import {CommonControllerConfig} from "../common/common.controller.config"
import models from '../../database/postgresSql/models/index'
import fs from 'fs'
import path from 'path'
import Joi from 'joi'
import NodeRSA from 'node-rsa'
import {privateRSAKEY} from '../../config/secured.vals'
import { Request, Response } from "express"

const Privilege = models.Privilege

export class PrivilegesController extends CommonControllerConfig{

    private key = new NodeRSA(privateRSAKEY)

    constructor() {
        super("PrivilegeController");
    }



    //get all privileges
    all = async (req : Request, res : Response) => {
            try{
                const privileges= await Privilege.findAll() ;
                res.send(this.s('success',privileges))

            }catch (e) {
                res.send(this.s('failed',e,500))
            }
    }

    //create privilege
    create = async (req : Request, res : Response) => {
        const privilege = await this.#create_privilege(req,true)

        return res.send(privilege)
    }



    //get privilege by id
    getById = async (req : Request, res : Response) => {

        try{

            const privilege = await Privilege
                .findOne({where:{id:req.params.id}})

            res.send(this.s('success',privilege))

        }catch (e) {
            res.send(this.s('failed',e,500))
        }
    }

    //get privilege by user id
    getByUserId = async (req : Request, res : Response) => {

        try {
            const privilege = await Privilege
                .findOne({where:{userId:req.params.userId}})

            res.send(this.s('success',privilege))
        }catch (e) {
            res.send(this.s('failed', e, 500))
        }
    }


    //get privilege by app id
    getByAppId = async (req : Request, res : Response) => {

        try {
            const privilege = await Privilege
                .findOne({where:{appId:req.params.appId}})

            res.send(this.s('success',privilege))
        }catch (e) {
            res.send(this.s('failed', e, 500))
        }
    }


    // update privilege
    put = async (req : Request, res : Response) => {

        try{
            //extract privilege body object
            const {id, viewProfile} = req.body

            //validator format
            const schema = Joi.object({
                id:Joi.number().required(),
                viewProfile:Joi.boolean().required(),
            })



            const {error} = schema.validate(req.body)

            //checking error
            if(error)
                res.send(this.s('failed',
                    error.details[0].message,409))

            else{

                //check if app exists
                const privilege = await Privilege
                    .findOne({where:{id},plain:true})

                if(privilege) {

                    try{


                        //update app
                        const updatedApp = await Privilege.update(
                            {viewProfile},
                            {where:{id},
                            returning:true,
                            })

                        res.send(this.s('success',updatedApp[1]))

                    }catch (e) {
                        res.send(this.s('failed',e,500))
                    }

                }else{
                    res.send(this.s('failed','app does not exists'))
                }

            }

        }catch (e) {
            res.send(this.s('failed',e,500))
        }
    }


    /**
     * creating privilege and return token that contains user privileges
     *
     * @param req :request node parameter
     * @param with_token : return data with token included
     *
     * @returns {Promise<{data: *, message: *, status: number}>}
     */
    #create_privilege = async (req : Request,with_token=false)=> {
         const {userId,appId,viewProfile} = req.body


        try{

                //validator format
                const schema = Joi.object({
                    userId:Joi.string().required().min(20),
                    appId:Joi.string().required(),
                    viewProfile:Joi.boolean().required(),
                })

                const {error} = schema.validate(req.body)

                //checking error
                if(error)
                    return (this.s('failed',
                        error.details[0].message,409))

                else{


                    //check if app exists
                    const privilege = await Privilege
                        .findOne({where:{userId,appId},plain:true})
                    let result = [];

                    if(privilege) {//if privilege exists let us update it
                        result = await Privilege
                            .update({viewProfile},
                                {where:{id:privilege.id},
                                    returning:true}) //update privilege
                        result = result[1]
                    }

                    else // if it does not exist let us create
                        result = await Privilege
                            .create({userId, appId , viewProfile})

                    if(with_token) {
                        const data_to_encrypt =
                            `uid:${userId},aid:${appId},vp:${viewProfile}`
                        const token = viewProfile ?
                            this.#privilege_token(data_to_encrypt) : null

                        result = {...result[0].dataValues,token}
                    }

                    return (this.s('success',result))

                }

        }catch (e) {
           return (this.s('failed',e,500))
        }
    }

    permit_privilege = async (req : Request, res : Response) => {
        const {appId,userId} = req.body
        const data_to_encrypt = `uid:${userId},aip:${appId},vp:true`

        const {data:{token}} = await this.#create_privilege(req,true)

        console.log(token)

        res.send(this.s('success',{token}))
    }

    /**
     * generate privilege encrypted token
     *
     * @param data : string data to be encrypted
     *
     * @returns {string|Buffer}
     */
    #privilege_token = (data : string) => {
        return this.key.encrypt(data, 'base64');
    }

    /**
     * decrypting token and get privileges
     *
     * @param token : string token to be decrypted
     *
     * @returns {Buffer|Object|string}
     */
    decrypt_privilege_token = (token : string) => {
        return this.key.decrypt(token,'utf8')
    }



}

